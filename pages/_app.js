import "../styles/globals.css";

import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

const apolloClient = new ApolloClient({
  uri: "https://api.lens.dev",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </WagmiConfig>
  );
}

export default MyApp;
