import { I18N } from 'aurelia-i18n';
import { State } from 'store/state';
import { HttpClient } from 'aurelia-fetch-client';
import { lazy } from 'aurelia-framework';
import environment from 'environment';
import SSC from 'sscjs';
import { connectTo, dispatchify } from 'aurelia-store';
import steem from 'steem';
import { logout } from 'store/actions';

import { ToastService, ToastMessage } from './toast-service';
import { queryParam, popupCenter, tryParse } from 'common/functions';

@connectTo()
export class SteemEngine {
    private http: HttpClient;
    private ssc;
    private state: State;

    constructor(
        @lazy(HttpClient) private getHttpClient: () => HttpClient,
        private i18n: I18N,
        private toast: ToastService) {
        this.http = getHttpClient();
        this.ssc = new SSC(environment.RPC_URL);

        this.http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl(environment.ACCOUNTS_API_URL);
        });
    }

    request(url: string, params: any) {
        // Cache buster
        params.v = new Date().getTime();

        url = url + queryParam(params);

        this.http.fetch(url, {
            method: 'GET'
        })
    }

    async login(username: string, key: string) {
        if (window.steem_keychain && !key) {
		    steem_keychain.requestSignBuffer(username, 'Log In', 'Posting', function(response) {
				if (response.error) {
                    const toast = new ToastMessage();

                    toast.message = this.i18n.tr('errorLogin', { 
                        username, 
                        ns: 'errors' 
                    });

                    this.toast.error(toast);
				} else {
					localStorage.setItem('username', username);
					window.location.reload();
				}
			});
        } else {
			try {
				if (key && !steem.auth.isWif(key)) {
					key = steem.auth.getPrivateKeys(username, key, ['posting']).posting;
				}
			} catch(err) {
                const toast = new ToastMessage();

                toast.message = this.i18n.tr('invalidPrivateKeyOrPassword', { 
                    ns: 'errors' 
                });

                this.toast.error(toast);
				return;
            }

            try {
                const user = await steem.api.getAccountsAsync([username]);

                if (user && user.length > 0) {
					try {
						if (steem.auth.wifToPublic(key) == user[0].memo_key || steem.auth.wifToPublic(key) === user[0].posting.key_auths[0][0]) {
							localStorage.setItem('username', username);
							localStorage.setItem('key', key);
							window.location.reload();
						} else {
                            const toast = new ToastMessage();

                            toast.message = this.i18n.tr('errorLogin', { 
                                ns: 'errors' 
                            });
            
                            this.toast.error(toast);
						}
					} catch(err) {
                        const toast = new ToastMessage();

                        toast.message = this.i18n.tr('errorLogin', { 
                            ns: 'errors' 
                        });
        
                        this.toast.error(toast);
					}
                } else {
                    const toast = new ToastMessage();

                    toast.message = this.i18n.tr('errorLoading', { 
                        ns: 'errors' 
                    });
    
                    this.toast.error(toast);
                }
            } catch (e) {
                return;
            }
        }
    }

    logout() {
        dispatchify(logout)();
    }

    steemConnectJson(auth_type, data) {
        return new Promise((resolve, reject) => {
            const username = this.state.user.name;
            let url = 'https://steemconnect.com/sign/custom-json?';

            if (auth_type == 'active') {
                url += 'required_posting_auths=' + encodeURI('[]');
                url += '&required_auths=' + encodeURI('["' + username + '"]');
            } else {
                url += 'required_posting_auths=' + encodeURI('["' + username + '"]');
            }
    
            url += '&id=' + environment.CHAIN_ID;
            url += '&json=' + encodeURI(JSON.stringify(data));
    
            popupCenter(url, 'steemconnect', 500, 560);
        });
    }

    async getAccount(username: string) {
        try {
            const user = await steem.api.getAccountsAsync([username]); 
        
            return user && user.length > 0 ? user[0] : null;
        } catch (e) {
            throw new Error(e);
        }
    }

    async loadBalances(account: string) {
        return await this.ssc.find('tokens', 'balances', { account: account }, 1000, 0, '', false);
    }

    async loadTokens() {
        return new Promise((resolve, reject) => {
            this.ssc.find('tokens', 'tokens', { }, 1000, 0, [], (err, result) => {
                let tokens = result;
    
                this.ssc.find('market', 'metrics', { }, 1000, 0, '', false).then(async (metrics) => {
                    tokens.forEach(token => {
                        token.highestBid = 0;
                        token.lastPrice = 0;
                        token.lowestAsk = 0;
                        token.marketCap = 0;
                        token.volume = 0;
                        token.priceChangePercent = 0;
                        token.priceChangeSteem = 0;
    
                        token.metadata = tryParse(token.metadata);

                        if (!token.metadata) {
                            token.metadata = {};
                        }
    
                        if (!metrics) {
                            return;
                        }
    
                        const metric = metrics.find(m => token.symbol == m.symbol);
    
                        if (metric) {
                            token.highestBid = parseFloat(metric.highestBid);
                            token.lastPrice = parseFloat(metric.lastPrice);
                            token.lowestAsk = parseFloat(metric.lowestAsk);
                            token.marketCap = token.lastPrice * token.circulatingSupply;
                            
                            if (Date.now() / 1000 < metric.volumeExpiration) {
                                token.volume = parseFloat(metric.volume);
                            }
    
                            if(Date.now() / 1000 < metric.lastDayPriceExpiration) {
                                token.priceChangePercent = parseFloat(metric.priceChangePercent);
                                token.priceChangeSteem = parseFloat(metric.priceChangeSteem);
                            }
                        }
    
                        if (token.symbol == 'STEEMP') {
                            token.lastPrice = 1;
                        }
                    });
    
                    tokens.sort((a, b) => {
                        return (b.volume > 0 ? b.volume : b.marketCap / 1000000000) - (a.volume > 0 ? a.volume : a.marketCap / 1000000000);
                    });
    
                    const steemp_balance = await this.ssc.findOne('tokens', 'balances', { account: 'steem-peg', symbol: 'STEEMP' });
    
                    if (steemp_balance && steemp_balance.balance) {
                        const token = await this.getToken('STEEMP');
                        token.supply -= parseFloat(steemp_balance.balance);
                        token.circulatingSupply -= parseFloat(steemp_balance.balance);
                    }
    
                    resolve(tokens);
                });
            });
        });
    }

    async loadParams() {
        // let loaded = 0;

		// this.ssc.findOne('sscstore', 'params', {  }, (err, result) => {
		// 	if(result && !err)
		// 		Object.assign(SE.Params, result);

		// 	if(++loaded >= 3 && callback)
		// 		callback();
		// });

		// this.ssc.findOne('tokens', 'params', {  }, (err, result) => {
		// 	if(result && !err)
		// 		Object.assign(SE.Params, result);

		// 	if(++loaded >= 3 && callback)
		// 		callback();
		// });

		// // loadSteemPrice(() => {
		// // 	if(++loaded >= 3 && callback)
		// // 		callback();
		// // });
    }

    async getToken(symbol): Promise<any> {
        return {};
    }

    // async showHistory(symbol: string, name: string) {
    //     let token =  this.getToken(symbol);
        
    //     const history = await this.request('/history', { account: this.state.user.name, limit: 100, offset: 0, type: 'user', symbol: symbol });
    // }

    issueToken(symbol, to, quantity) {
        const transaction_data = {
            'contractName': 'tokens',
            'contractAction': 'issue',
            'contractPayload': {
                'symbol': symbol,
                'to': to,
                'quantity': quantity
            }
        };
    }
}
