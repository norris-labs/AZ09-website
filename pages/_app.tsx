import "../styles/globals.css";
import * as React from "react";

import { fantomConnector, fantomTestConnector } from '../config/fantom_chain';

import type { AppProps } from 'next/app'
import Head from 'next/head';
import { Provider as WagmiProvider } from "wagmi";
import { ThemeProvider } from "@mui/material/styles";
import { providers } from 'ethers'
import { theme } from "../config";

const ankrProvider = new providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC as string)
const connector = process.env.NODE_ENV === 'development' ? fantomTestConnector : fantomConnector;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>AZ09</title>
        <meta name="description" content="AZ09 NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WagmiProvider autoConnect provider={ankrProvider} connectors={[connector]}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps}/>
        </ThemeProvider>
      </WagmiProvider>
    </>
  );
}
