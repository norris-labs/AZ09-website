import '../styles/globals.css'

import { DAppProvider, Config, Fantom } from '@usedapp/core'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app'


const config: Config = {
  networks: [Fantom]
}

const theme = createTheme({
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          background: 'green',
          backgroundColor: 'orange',
          height: 3,
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#ff3c00',
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
