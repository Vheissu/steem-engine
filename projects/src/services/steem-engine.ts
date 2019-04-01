import environment from 'environment';
import SSC from 'sscjs';

export class SteemEngine {
    private ssc;

    constructor() {
        this.ssc = new SSC(environment.RPC_URL);
    }

    async loadBalances(account: string) {
        return await this.ssc.find('tokens', 'balances', { account: account }, 1000, 0, '', false);
    }
}
