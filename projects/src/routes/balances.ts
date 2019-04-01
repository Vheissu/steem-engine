import { State } from 'store/state';
import { dispatchify, connectTo, Store } from 'aurelia-store';
import { loadBalances, loadTokens } from 'store/actions';

import { pluck, map } from 'rxjs/operators';

import { GridOptions } from 'ag-grid-community';
import { usdFormat } from 'common/functions';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class Balances {
    private username = null;
    private state: State;
    private gridOptions: GridOptions;

    constructor(private store: Store<State>) {
        this.gridOptions = <GridOptions>{};

        this.gridOptions.columnDefs = [
            {headerName: 'Name', field: 'name', sortable: true },
            {headerName: 'Last Price', field: 'lastPrice', sortable: true },
            {headerName: '% Changed', field: 'priceChangePercent', sortable: true },
            {headerName: 'USD Value', field: 'usdValue', sortable: true },
        ];

        this.gridOptions.defaultColDef = {
            filter: true,
            menuTabs: ['filterMenuTab']
        }
    }

    bind() {
        this.store.state.subscribe((state: State) => {
            this.state = state;

            this.state.user.balances = this.state.user.balances.map(d => {
                const token = this.state.tokens.find(t => t.symbol === d.symbol);
        
                return Object.assign(d, { 
                    name: token.name, 
                    lastPrice: token.lastPrice, 
                    priceChangePercent: token.priceChangePercent,
                    usdValue: usdFormat(d.balance * token.lastPrice, 2)
                });
            });
        
            //this.state.user.balances.sort((a, b) => b.balance * b.lastPrice * window.steem_price - a.balance * a.lastPrice * window.steem_price);
        
            let totalInUsd = 0.00;
            this.state.user.balances.forEach(function(o) {
                var amount = parseFloat(o.usdValue.replace('$', '').replace(',', ''));
                totalInUsd += amount;
            });

            console.log(this.state.user.balances);
        });
    }

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

        await dispatchify(loadTokens)();
        await dispatchify(loadBalances)(this.username);
    }
}
