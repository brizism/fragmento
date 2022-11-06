import "../styles/globals.scss";

import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { SessionProvider } from "next-auth/react";
import { LensProvider } from "../hooks/useLens";


const httpLink = createHttpLink({
  uri: "https://api.lens.dev",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('lens')
  const { expires, access } = JSON.parse(token) || {};
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'x-access-token': access?.authenticate?.accessToken,
    }
  }
});

const _client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
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
