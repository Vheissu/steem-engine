import { State } from 'store/state';
import { HttpClient } from 'aurelia-fetch-client';
import { lazy } from 'aurelia-framework';
import environment from 'environment';
import SSC from 'sscjs';
import { connectTo } from 'aurelia-store';

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

    async loadBalances(account: string) {
        return await this.ssc.find('tokens', 'balances', { account: account }, 1000, 0, '', false);
    }

    // async showHistory(symbol: string, name: string) {
    //     let token =  this.getToken(symbol);
        
    //     const history = await this.request('/history', { account: this.state.user.name, limit: 100, offset: 0, type: 'user', symbol: symbol });
    // }
}
