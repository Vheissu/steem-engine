import { baseEnvironmentConfiguration } from 'base-environment';

export default {
    ...baseEnvironmentConfiguration,
    debug: false,
    testing: false,
    MAINTENANCE_MODE: false,
	CHAIN_ID: 'ssc-mainnet1',
	RPC_URL: 'https://api.steem-engine.com/rpc',
	ACCOUNTS_API_URL: 'https://api.steem-engine.com/accounts',
	NATIVE_TOKEN: 'ENG',
	STEEMP_ACCOUNT: 'steem-peg',
	PEGGED_TOKEN: 'STEEMP'
} as any;
