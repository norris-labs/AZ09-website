import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Config, DAppProvider, Fantom } from '@usedapp/core';
import type { AppProps } from 'next/app';
import '../styles/globals.css';


const config: Config = {
  networks: [Fantom]
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#FC542B',
    },
  }
});


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
