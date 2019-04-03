import { ssc } from '../client';

export default {
    Query: {
        tradesHistory: async (_, { symbol }) => {
            const params: any = { symbol };

            const results: any[] = await ssc.find('market', 'tradesHistory', params, 30, 0, [
                { 
                    index: 'timestamp', 
                    descending: false 
                }
            ], false);

            return results;
        }
    }
}