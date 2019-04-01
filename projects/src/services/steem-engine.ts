import { State } from 'store/state';
import { HttpClient } from 'aurelia-fetch-client';
import { lazy } from 'aurelia-framework';
import environment from 'environment';
import SSC from 'sscjs';
import { connectTo, dispatchify } from 'aurelia-store';
import steem from 'steem';
import { logout } from 'store/actions';

@connectTo()
export class SteemEngine {
    private http: HttpClient;
    private ssc;
    private state: State;

    constructor(@lazy(HttpClient) private getHttpClient: () => HttpClient) {
        this.http = getHttpClient();
        this.ssc = new SSC(environment.RPC_URL);

        this.http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl(environment.ACCOUNTS_API_URL);
        });
    }

    request(url: string) {
        url = url + `?v=${new Date().getTime()}`;

        this.http.fetch(url, {
            method: 'GET'
        })
    }

    async login(username: string, key: string) {
        if (window.steem_keychain && !key) {
		    steem_keychain.requestSignBuffer(username, 'Log In', 'Posting', function(response) {
				if(response.error) {
                    //SE.ShowToast(false, 'Unable to log in with the @' + username + ' account.');
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
                //SE.ShowToast(false, 'Invalid private key or master password.');
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
                            //SE.ShowToast(false, 'Unable to log in with the @' + username + ' account. Invalid private key or password.');
						}
					} catch(err) {
                        //SE.ShowToast(false, 'Unable to log in with the @' + username + ' account. Invalid private key or password.');
					}
                } else {
                    //SE.ShowToast(false, 'There was an error loading the @' + username + ' account.');
                }
            } catch (e) {
                return;
            }
        }
    }

    logout() {
        dispatchify(logout)();
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

    // async showHistory(symbol: string, name: string) {
    //     let token =  this.getToken(symbol);
        
    //     const history = await this.request('/history', { account: this.state.user.name, limit: 100, offset: 0, type: 'user', symbol: symbol });
    // }
}
