import '../styles/globals.css'

import { DAppProvider, Config, Fantom } from '@usedapp/core'

import type { AppProps } from 'next/app'

const config: Config = {
  networks: [Fantom]
}


function MyApp({ Component, pageProps }: AppProps) {
  return (
  <DAppProvider config={config}>
    <Component {...pageProps} />
  </DAppProvider>
  )
}

export default MyApp
