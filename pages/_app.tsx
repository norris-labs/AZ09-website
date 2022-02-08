import { ThemeProvider } from '@mui/material/styles';
import { DAppProvider } from '@usedapp/core';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { config } from '../utils/networkConfig';
import { theme } from '../utils/theme';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </DAppProvider>
  )
}

export default MyApp
