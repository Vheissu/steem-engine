import { State } from 'store/state';
import { dispatchify, connectTo } from 'aurelia-store';
import { loadBalances } from 'store/actions';

@connectTo()
export class Balances {
    private username = null;
    private state: State;

    async canActivate({ user }) {
        const cachedUsername = localStorage.getItem('username');

        if (!user && !cachedUsername) {
            return false;
        }

        if (!user) {
            this.username = cachedUsername;
        } else {
            this.username = user;
        }

        await dispatchify(loadBalances)(this.username);
    }
}
