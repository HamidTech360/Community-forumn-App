import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://setlinn.com/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
