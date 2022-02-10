import { Account, Connect, NetworkSwitcher } from '../components/Navigation'
import React, { useCallback, useState } from "react";
import {
  Tab,
  TabChicklet,
  TabContainer,
  TabList,
  TabPanel,
} from "../components/UI/Tabs/Tabs.styles";
import { useCost, useMintedTokenIDs } from '../hooks'

import { BigNumber } from "ethers";
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
  const [editionName, setEditionName] = useState<'light'|'dark'>('dark');
  const [currentTab, setCurrentTab] = useState<number>(0)
  const cost = useCost();
  const [{data: mintedTokenIDs = []}, read] = useMintedTokenIDs(editionName);
  const [{ data: accountData }] = useAccount()

  function selectTab(tabName: 'dark'|'light') {
    setEditionName(tabName)
    setCurrentTab(tabName === 'dark' ? 0 : 1);
  }

  const isNFTMinted = useCallback((tokenID: number) => {
    debugger;
    const s = mintedTokenIDs;
    console.log(s);
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
      mintedTokenIDs: {JSON.stringify(mintedTokenIDs.map((id: BigNumber) => id.toNumber()))} <br/>
      editionName: {editionName}
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
            isNFTMinted={isNFTMinted}
            activeMintId={null}
            setActiveMintId={(id: number) => {}}
            editionName={'dark'}
          />
        </TabPanel>

        <TabPanel value={1}>
          <PaginatedNFTs
            cost={cost}
            isNFTMinted={isNFTMinted}
            activeMintId={null}
            setActiveMintId={(id: number) => {}}
            editionName={'light'}
          />
        </TabPanel>
      </TabContainer>
    </Container>
  )

}

export default Index;
