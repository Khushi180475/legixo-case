import { GraphQLClient } from 'graphql-request';

const endpoint = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL.replace('/api', '/graphql') 
  : 'http://localhost:5000/graphql';

export const gqlClient = new GraphQLClient(endpoint);
