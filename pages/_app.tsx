import "../styles/globals.css";
import type { AppProps } from 'next/app'
import * as React from "react";
import {fantomConnector} from '../utils/fantom_chain';
import { Provider } from "wagmi";
import { ThemeProvider } from "@mui/material/styles";
import Head from 'next/head';
import { theme } from "../utils/theme";
import { providers } from 'ethers'

const ankrProvider = new providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC as string)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>AZ09</title>
        <meta name="description" content="AZ09 NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider autoConnect provider={ankrProvider} connectors={[fantomConnector]}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps}/>
        </ThemeProvider>
      </Provider>
    </>
  );
}
