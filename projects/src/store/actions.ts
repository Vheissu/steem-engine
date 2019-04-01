import { SteemEngine } from 'services/steem-engine';
import { Container } from 'aurelia-framework';
import { State } from './state';
import store from './store';

const SE = Container.instance.get(SteemEngine);

export async function login(state: State, user: any): Promise<State> {
    let newState = { ...state };

    newState.loggedIn = true;

    return newState;
}

export async function logout(state: State): Promise<State> {
    const newState = { ...state };

    newState.loggedIn = false;

    newState.user = {
        name: null,
        balances: []
    };

    return newState;
}

export async function loadBalances(state: State, username: string): Promise<State> {
    let newState = { ...state };

    const balances = await SE.loadBalances(username);

    newState.user.balances = balances;

    return newState;
}

export async function getToken(state: State, token: string) {
    let newState = { ...state };
    
    if (newState.user.balances) {
        const token = newState.user.balances.find(b => b.symbol === token);
        newState.token = token ? parseFloat(token.balance) : 0;
    } else {
        newState.token = 0;
    }

    return newState;
}

store.registerAction('login', login);
store.registerAction('logout', logout);
store.registerAction('loadBalances', loadBalances);
store.registerAction('getToken', getToken);
