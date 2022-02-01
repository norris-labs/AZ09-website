import * as React from 'react';

import { Container, Link, Typography } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';

import Box from "@mui/material/Box";
import { Content } from '../components/Content';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import type { NextPage } from 'next';
import { Toast } from '../components/Toast';
import { useCost } from "../hooks/useCost";
import { useEthers } from '@usedapp/core';
import { useMint } from "../hooks/useMint";
import { useMintedTokenIDs } from "../hooks/useMintedTokenIDs";
import { utils } from 'ethers';

const Home: NextPage = () => {
  const { activateBrowserWallet, account, deactivate, active, chainId } = useEthers()
  const [currentTab, setCurrentTab] = useState<number>(0)
  const cost: number = useCost()
  const mintedTokenIDs = useMintedTokenIDs()
  const [toastMessage, setToastMessage] = useState('');
  const [noticeType, setNoticeType] = useState('');
  const [currentEdition, setCurrentEdition] = useState('light');
  const [mintTarget, setMintTarget] = useState<null|number>(null);
  const {state: mintNFTState, send: mintNFT} = useMint(currentEdition);
  const {state: sudoMintNFTState, send: sudoMintNFT} = useMint(currentEdition);



  useEffect(() => {
    if (currentTab === 0) {
      setCurrentEdition('light')
    } else {
      setCurrentEdition('dark')
    }
  }, [currentTab])

  useEffect(() => {
    const message = mintNFTState.errorMessage || mintNFTState.status;
    const status = mintNFTState.status;
    setToastMessage(message)
    setNoticeType(status)
  }, [mintNFTState])

  useEffect(() => {
    if (mintNFTState.status === "None" || mintNFTState.status === "Exception") {
      setMintTarget(null);
    }
  }, [mintTarget])

  function sendMintTX(id: number) {
    setMintTarget(id);
    mintNFT(id, {
      value: cost
    });
  }

  function sendSudoMintTX(id: number) {
    setMintTarget(id);
    sudoMintNFT(id, {
      value: cost
    });
  }


  const isNFTMinted = useCallback((tokenID: number) => {
    return mintedTokenIDs.includes(tokenID)
  }, [mintedTokenIDs])


  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container fixed maxWidth="xl">
        <Navigation account={account} activateBrowserWallet={activateBrowserWallet} />
        <Box sx={{
          my: 10
        }}>
          <Typography variant="h3" component="h1">
            AZ09 is a collection of 2,592 unique, programmatically generated monogram <Link target="_blank" href="https://ethereum.org/en/nft/">NFTs</Link> on the <Link target="_blank" href="https://fantom.foundation/">Fantom network</Link>. All Monograms contain two (hand drawn) characters from the permutations of A-Z and 0-9. No two monograms are alike. Comes in two variations: Dark and Light.
          </Typography>
        </Box>
        <Content
          cost={cost ? utils.formatEther(cost) : 0}
          mintTarget={mintTarget}
          txState={mintNFTState}
          sendSudoMintTX={sendSudoMintTX}
          sendMintTX={sendMintTX}
          setCurrentTab={setCurrentTab}
          currentTab={currentTab}
          isNFTMinted={isNFTMinted}
        />

        {JSON.stringify(mintNFTState)}
        {process.env.NEXT_PUBLIC_CHAIN_ID}

        <Toast
          message={toastMessage}
          noticeType={noticeType}
        />

      </Container>
    </div>
  )
}

export default memo(Home)
