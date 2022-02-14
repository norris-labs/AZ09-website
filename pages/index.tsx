import { Account, Connect, NetworkSwitcher } from '../components/Navigation'
import React, { useCallback, useEffect, useState } from "react";
import {
  Tab,
  TabChicklet,
  TabContainer,
  TabList,
  TabPanel,
} from "../components/UI/Tabs/Tabs.styles";
import { useCost, useMint, useMintedTokenIDs } from '../hooks'
import {Alert} from '../components/UI/Alert'
import Box from "@mui/material/Box";
import { Container } from '@mui/material';
import { EditionNames } from '../constants'
// import { Header } from '../components/UI/Header'
import type { NextPage } from 'next';
import { PaginatedNFTs } from '../components/NFTs/PaginatedNFTs'
import { useAccount, useNetwork } from 'wagmi'
import { AlertState } from '../components/UI/Alert'

enum Copy {
  Tab1 = 'Dark Edition',
  Tab2 = 'Light Edition',
}
const DISPLAY_SECONDS = 5 * 1000

const Index: NextPage = () => {
  const [alertState, setAlertState] = useState<AlertState|null>(null);
  const [selectedEditionName, setSelectedEditionName] = useState<'light'|'dark'>('dark');
  const [currentTab, setCurrentTab] = useState<number>(0)
  const [activeMintId, setActiveMintId] = useState<number|null>(null)
  const cost = useCost();
  const {mintedTokenIDs} = useMintedTokenIDs(selectedEditionName);
  const [{data: accountData}] = useAccount()
  const [networkData, _] = useNetwork();
  const {
    waitLoading,
    writeLoading,
    data,
    error,
    mintNFT
  } = useMint({editionName: selectedEditionName, cost})

  useEffect(() => {
    if (!activeMintId) return;

    mintNFT(activeMintId)
  }, [activeMintId])

  useEffect(() => {
    if (writeLoading === false && waitLoading === false) {
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
  }, [writeLoading, waitLoading])

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
    }, DISPLAY_SECONDS)

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
      <Box
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
      {accountData?.address ?
        <>
          {networkData?.data?.chain?.unsupported ?
            <NetworkSwitcher />
            :
            <Account />
          }
        </>
        :
        <Connect />
      }
      </Box>
      <Box sx={{mb: 4}}>
        {/* mintedTokenIDs: {JSON.stringify(mintedTokenIDs)} <br/> */}
        {/* selectedEditionName: {selectedEditionName}<br/> */}
        activeMintId: {JSON.stringify(activeMintId)}<br/>
        writeLoading: {JSON.stringify(writeLoading)}<br/>
        waitLoading: {JSON.stringify(waitLoading)}<br/>
        mintError: {JSON.stringify(error)}<br/>
        alertState: {JSON.stringify(alertState)}<br/>
        {/* data: {JSON.stringify(data)}<br/> */}
        {/* env: {process.env.NODE_ENV}<br/> */}
        {/* currentTab: {currentTab}<br/> */}
        {/* NEXT_PUBLIC_CHAIN_ID: {Number(process.env.NEXT_PUBLIC_CHAIN_ID)}<br/> */}
        {/* cost : {cost} */}
      </Box>
      {/* <Header /> */}

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
            loading={waitLoading}
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
