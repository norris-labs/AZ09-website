import { Container, Link, Typography } from '@mui/material';
import * as React from 'react';
import Box from "@mui/material/Box";
import { useEthers, TransactionState } from '@usedapp/core';
import { utils } from 'ethers';
import type { NextPage } from 'next';
import { Fantom } from "@usedapp/core";
import Head from 'next/head';
import { capitalize } from "@mui/material";
import { memo, useCallback, useEffect, useState } from 'react';
import { App } from '../components/App';
import { Navigation } from '../components/Navigation';
import { Toast } from '../components/Toast';
import { useCost } from "../hooks/useCost";
import { EditionNames } from '../constants'
import { useMint } from "../hooks/useMint";
import { useMintedTokenIDs } from "../hooks/useMintedTokenIDs";

enum Copy {
  connectWallet = 'Connect wallet before minting',
  switchChain = 'Switch to Fantom Chain before minting',
  mintError = 'There was an error minting NFT, try again',
  unknownError = 'There has been an unknown error, try again',
}

export enum TXStates {
  None = "None",
  PendingSignature = "PendingSignature",
  Mining = "Mining",
  Success = "Success",
  Fail = "Fail",
  Exception = "Exception",
}

const Home: NextPage = () => {
  const {
    activateBrowserWallet,
    chainId,
    account,
    error
  } = useEthers();
  const [currentTab, setCurrentTab] = useState<number>(0)
  const cost: number = useCost()
  const mintedTokenIDs = useMintedTokenIDs()
  const [toastType, setToastType] = useState<TransactionState|null>();
  const [toastMessage, setToastMessage] = useState<string|null>();
  const [editionName, setEditionName] = useState<'light'|'dark'>('dark');
  const [activeMintId, setActiveMintId] = useState<null|number>(null);
  const {state: mintTxState, send: sendMintTx} = useMint(editionName);

  useEffect(() => {
    let focusedEdition;

    if (currentTab === 0) {
      focusedEdition = EditionNames.Light
    } else {
      focusedEdition = EditionNames.Dark
    }

    setEditionName(focusedEdition)
  }, [currentTab])

  useEffect(() => {
    if (mintTxState.status === "None" || mintTxState.status === "Exception") {
      setActiveMintId(null);
    }
  }, [activeMintId])

  const closeToast = useCallback(() => {
    setToastMessage(null);
    setToastType(null);
  }, []);

  useEffect(() => {
    if (
      mintTxState.status === 'Exception' ||
      mintTxState.status === 'Fail' ||
      mintTxState.status === 'Success' ||
      mintTxState.status === 'Mining') {
        if (!mintTxState.errorMessage) {
          setToastMessage(Copy.unknownError);
          return;
        }
        setToastMessage(capitalize(mintTxState.errorMessage));
        setToastType(mintTxState.status);
    }
  }, [mintTxState.status])

  useEffect(() => {
    if (!activeMintId) return;
    if (!account) {
      setToastType('Exception');
      setToastMessage(Copy.connectWallet);
      return;
    }
    if (Fantom.chainId !== chainId) {
      setToastType('Exception');
      setToastMessage(Copy.switchChain);
      return;
    }
    handleNFTMint();
  }, [activeMintId])

  const handleNFTMint = useCallback(() => {
    try {
      sendMintTx(activeMintId, {
        value: cost
      });
    } catch(e) {
      setToastType('Exception');
      setToastMessage(Copy.mintError);
    }
  }, [activeMintId])


  const isNFTMinted = useCallback((tokenID: number) => {
    return mintedTokenIDs.includes(tokenID);
  }, [mintedTokenIDs])


  console.log({
    error
  })
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container fixed maxWidth="xl">
        <Navigation
          account={account}
          chainId={chainId}
          activateBrowserWallet={activateBrowserWallet}
        />
        <Box sx={{
          my: 10
        }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              lineHeight: '2.5rem',
              '@media (max-width: 599.95px)': {
                fontSize: '1.75rem',
                lineHeight: '2.35rem',
              }
            }}
          >
            AZ09 is a collection of 2,592 unique, programmatically generated monogram <b><Link target="_blank" href="https://ethereum.org/en/nft/">NFTs</Link></b> on the <b><Link target="_blank" href="https://fantom.foundation/">Fantom network</Link></b>. All Monograms contain two (hand drawn) characters from the permutations of A-Z and 0-9. No two monograms are alike. Comes in two variations: Dark and Light.
          </Typography>
        </Box>
        <App
          activeMintId={activeMintId}
          cost={cost ? utils.formatEther(cost) : 0}
          editionName={editionName}
          currentTab={currentTab}
          isNFTMinted={isNFTMinted}
          setActiveMintId={setActiveMintId}
          setCurrentTab={setCurrentTab}
          txState={mintTxState}
        />

        mintTxState: {JSON.stringify(mintTxState)}
        error: {JSON.stringify(error)}
        mintedTokenIDs: {JSON.stringify(mintedTokenIDs)}
        {process.env.NEXT_PUBLIC_CHAIN_ID}

        {toastMessage && toastType &&
          <Toast
            toastMessage={toastMessage}
            toastType={toastType}
            closeToast={closeToast}
          />
        }

      </Container>
    </div>
  )
}

export default memo(Home)
