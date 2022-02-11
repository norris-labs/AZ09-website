import "../styles/globals.css";

import * as React from "react";

import { fantomConnector, fantomTestConnector } from '../config/fantom_chain';

import type { AppProps } from 'next/app'
import Head from 'next/head';
import { Provider } from "wagmi";
import { ThemeProvider } from "@mui/material/styles";
import { providers } from 'ethers'
import { theme } from "../config";

const ankrProvider = new providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC as string)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>AZ09</title>
        <meta name="description" content="AZ09 NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider autoConnect provider={ankrProvider} connectors={[fantomTestConnector]}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps}/>
        </ThemeProvider>
      </Provider>
    </>
  );
}
