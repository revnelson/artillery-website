import "../styles/tailwind.css"

import type { AppProps } from "next/app"
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider"

import { useApollo } from "@lib/apollo/client"
import Layout from "@components/Layout"

// ####
// #### Dynamic Imports
// ####

// const importOpts = {};

// ####
// #### Variables
// ####

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

export default App
