import "../styles/globals.scss";

import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { LensProvider } from "../hooks/useLens";

const _client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

const apolloClient = new ApolloClient({
  uri: "https://api.lens.dev",
  cache: new InMemoryCache(),
  headers: {
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4M0EzOTI2QjBGZTg4QTAzZThBNmJBNTkxQzhlYjA2MTJGMjA1M0M5YyIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE2Njc3MjMzNzksImV4cCI6MTY2NzcyNTE3OX0.E7DEqZbUU6J0OIZ3H35L7bQPTZsFr-ZDJZRJ2Whysrc",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={_client}>
      <ApolloProvider client={apolloClient}>
        <SessionProvider session={pageProps.session}>
          <LensProvider>
            <Component {...pageProps} />
          </LensProvider>
        </SessionProvider>
      </ApolloProvider>
    </WagmiConfig>
  );
}

export default MyApp;
