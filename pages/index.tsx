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
import {Toast} from '../components/UI/Toast'
import Box from "@mui/material/Box";
import { Container } from '@mui/material';
import { EditionNames } from '../constants'
import { Header } from '../components/UI/Header'
import type { NextPage } from 'next';
import { PaginatedNFTs } from '../components/NFTs/PaginatedNFTs'
import { useAccount, useNetwork } from 'wagmi'

enum Copy {
  Tab1 = 'Dark Edition',
  Tab2 = 'Light Edition',
}

const Index: NextPage = () => {
  const [toastIsOpen, openToast] = useState(false);
  const [selectedEditionName, setSelectedEditionName] = useState<'light'|'dark'>('dark');
  const [currentTab, setCurrentTab] = useState<number>(0)
  const [activeMintId, setActiveMintId] = useState<number|null>(null)
  const cost = useCost();
  const {mintedTokenIDs} = useMintedTokenIDs(selectedEditionName);
  const [{data: accountData}] = useAccount()
  const {
    submissionLoading,
    transactionLoading,
    transactionData,
    submissionData,
    transactionError,
    submissionError,
    mintNFT
  } = useMint({editionName: selectedEditionName, cost})
  const [networkData, _] = useNetwork();

  useEffect(() => {
    if (!activeMintId) return;

    mintNFT(activeMintId)
  }, [activeMintId])

  useEffect(() => {
    if (submissionLoading) {
      return
    };

    setActiveMintId(null)
  }, [submissionLoading])

  useEffect(() => {
    if (transactionLoading) {
      openToast(true);
      return
    };

    openToast(false);
  }, [transactionLoading])


  const selectTab = useCallback((tabName: 'dark'|'light') => {
    setSelectedEditionName(tabName)
    setCurrentTab(tabName === 'dark' ? 0 : 1);
  }, []);

  const isNFTMinted = useCallback((tokenID: number) => {
    return mintedTokenIDs.includes(tokenID);
  }, [mintedTokenIDs])

  return (
    <Container fixed maxWidth="xl">
      <Toast
        openToast={openToast}
        toastIsOpen={toastIsOpen}
        transactionError={transactionError}
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
        mintError: {JSON.stringify(transactionError)}<br/>
        mintData: {JSON.stringify(transactionData)}<br/>
        mintData: {JSON.stringify(submissionData)}<br/>
        {/* activeMintId: {JSON.stringify(activeMintId)}<br/> */}
        {/* currentTab: {currentTab}<br/> */}
        {/* NEXT_PUBLIC_CHAIN_ID: {Number(process.env.NEXT_PUBLIC_CHAIN_ID)}<br/> */}
        submissionLoading: {JSON.stringify(submissionLoading)}<br/>
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
            mintLoading={submissionLoading || transactionLoading}
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
            mintLoading={submissionLoading || transactionLoading}
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
