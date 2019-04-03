import { ssc } from '../client';

export default {
    Query: {
        buyBook: async (_, { symbol, account }) => {
            const params: any = { symbol, account };

            const results: any[] = await ssc.find('market', 'buyBook', params, 200, 0, [{ index: 'price', descending: true }], false);
            return results;
        }
    }
}