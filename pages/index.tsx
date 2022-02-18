import { ALERT_DISPLAY_SECONDS, EditionNames } from '../constants'
import React, { useCallback, useEffect, useState } from "react";
import {
  Tab,
  TabChicklet,
  TabContainer,
  TabList,
  TabPanel,
} from "../components/UI/Tabs/Tabs.styles";
import { useAccount, useBalance, useNetwork } from 'wagmi'
import { useCost, useMint, useMintedTokenIDs } from '../hooks'

import {Alert} from '../components/UI/Alert'
import { AlertState } from '../components/UI/Alert'
import { Container } from '@mui/material';
import { Debugger } from '../components/UI/Debugger'
import { Header } from '../components/UI/Header'
import { Navigation } from '../components/Navigation'
import type { NextPage } from 'next';
import { PaginatedNFTs } from '../components/NFTs/PaginatedNFTs'

enum Copy {
  Tab1 = 'Dark Edition',
  Tab2 = 'Light Edition',
}

const Index: NextPage = () => {
  const [alertState, setAlertState] = useState<AlertState|null>(null);
  const [selectedEditionName, setSelectedEditionName] = useState<'light'|'dark'>('dark');
  const [currentTab, setCurrentTab] = useState<number>(0)
  const [activeMintId, setActiveMintId] = useState<number|null>(null)
  const cost = useCost();
  const {mintedTokenIDs} = useMintedTokenIDs(selectedEditionName);
  const [{data: accountData}] = useAccount()
  const [{ data: userBalance }] = useBalance({
    addressOrName: accountData?.address,
  })
  const [networkData, _] = useNetwork();
  const {
    waitLoading,
    writeLoading,
    writeData,
    waitData,
    error,
    mintNFT
  } = useMint({
    editionName: selectedEditionName,
    cost,
    userFunds: userBalance
  })

  useEffect(() => {
    if (!activeMintId) return;

    mintNFT(activeMintId)
  }, [activeMintId])

  useEffect(() => {
    const completeSuccess =
      !error &&
      writeLoading === false &&
      waitLoading === false &&
      activeMintId &&
      waitData &&
      writeData;

    if (completeSuccess) {
      setAlertState(null);
      setActiveMintId(null);
    }

    if (waitLoading) {
      setAlertState({
        message: 'Minting NFT...',
        type: 'success',
        showLoader: true
      });
    }
  }, [waitData, waitLoading])

  useEffect(() => {
    if(!error) return;
    let interval: NodeJS.Timer

    setAlertState({
      message: error.message,
      type: 'error',
      showLoader: false
    });

    setActiveMintId(null);

    interval = setInterval(() => {
      setAlertState(null)
    }, ALERT_DISPLAY_SECONDS)

    return () => clearInterval(interval)
  }, [error])

  const selectTab = useCallback((tabName: 'dark'|'light') => {
    setSelectedEditionName(tabName)
    setCurrentTab(tabName === 'dark' ? 0 : 1);
  }, []);

  const isNFTMinted = useCallback((tokenID: number) => {
    return mintedTokenIDs.includes(tokenID);
  }, [mintedTokenIDs])

  return (
    <Container fixed maxWidth="xl">
      <Alert
        alertState={alertState}
        setAlertState={setAlertState}
      />
      <Navigation
        accountData={accountData}
        networkData={networkData}
        setAlertState={setAlertState}
      />
      <Header />

      <TabContainer defaultValue={0} id="tab-container">
        <TabList>
          <Tab onChange={() => selectTab(EditionNames.Dark)}>
            <TabChicklet tabNum={0} currentTab={currentTab}>
              1
            </TabChicklet>
            {Copy.Tab1}
          </Tab>
          <Tab onChange={() => selectTab(EditionNames.Light)}>
            <TabChicklet tabNum={1} currentTab={currentTab}>
              2
            </TabChicklet>
            {Copy.Tab2}
          </Tab>
        </TabList>

        <TabPanel value={0}>
          <PaginatedNFTs
            cost={cost}
            loading={waitLoading || writeLoading}
            isNFTMinted={isNFTMinted}
            activeMintId={activeMintId}
            selectedEditionName={selectedEditionName}
            setActiveMintId={setActiveMintId}
            editionName={'dark'}
          />
        </TabPanel>

        <TabPanel value={1}>
          <PaginatedNFTs
            cost={cost}
            loading={waitLoading || writeLoading}
            isNFTMinted={isNFTMinted}
            activeMintId={activeMintId}
            selectedEditionName={selectedEditionName}
            setActiveMintId={setActiveMintId}
            editionName={'light'}
          />
        </TabPanel>
      </TabContainer>
    </Container>
  )
}

export default Index;
