import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

import environment from 'environment';

// Setup the Apollo Client
const client = new ApolloClient({
    uri: environment.GRAPHQL_API
});

const query = query => client.query({ query: gql(query) });
const mutate = query => client.mutate({ mutation: gql(query) });

export { client, query, mutate };
