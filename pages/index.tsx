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

import Box from "@mui/material/Box";
import { Container } from '@mui/material';
import { EditionNames } from '../constants'
import { Header } from '../components/UI/Header'
import type { NextPage } from 'next';
import { PaginatedNFTs } from '../components/NFTs/PaginatedNFTs'
import { useAccount } from 'wagmi'

enum Copy {
  Tab1 = 'Dark Edition',
  Tab2 = 'Light Edition',
}

const Index: NextPage = () => {
  const [selectedEditionName, setSelectedEditionName] = useState<'light'|'dark'>('dark');
  const [currentTab, setCurrentTab] = useState<number>(0)
  const [activeMintId, setActiveMintId] = useState<number|null>(null)
  const cost = useCost();
  const mintedTokenIDs = useMintedTokenIDs(selectedEditionName);
  const [{ data: accountData }] = useAccount()
  const {mintData,  mintError,  mintLoading, mintNFT} = useMint({editionName: selectedEditionName, cost})

  useEffect(() => {
    if (!activeMintId) return;
    debugger;

    mintNFT(activeMintId)
  }, [activeMintId])

  useEffect(() => {
    if (mintLoading) return;

    setActiveMintId(null)

  }, [mintLoading])

  function selectTab(tabName: 'dark'|'light') {
    setSelectedEditionName(tabName)
    setCurrentTab(tabName === 'dark' ? 0 : 1);
  }

  const isNFTMinted = useCallback((tokenID: number) => {
    return mintedTokenIDs.includes(tokenID);
  }, [mintedTokenIDs])

  return (
    <Container fixed maxWidth="xl">
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
          <Account />
          <NetworkSwitcher />
        </>
        :
        <Connect />
      }
      </Box>
      mintedTokenIDs: {JSON.stringify(mintedTokenIDs)} <br/>
      selectedEditionName: {selectedEditionName}<br/>
      mintError: {JSON.stringify(mintError)}<br/>
      mintData: {JSON.stringify(mintData)}<br/>
      activeMintId: {JSON.stringify(activeMintId)}<br/>
      mintLoading: {JSON.stringify(mintLoading)}<br/>
      cost : {cost}
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
            mintLoading={mintLoading}
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
            mintLoading={mintLoading}
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
