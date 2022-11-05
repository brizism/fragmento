import "../styles/globals.css";

import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SessionProvider } from "next-auth/react"

const _client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

const apolloClient = new ApolloClient({
  uri: "https://api.lens.dev",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={_client}>
      <ApolloProvider client={apolloClient}>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider> 
      </ApolloProvider>
    </WagmiConfig>
  );
}

export default MyApp;
