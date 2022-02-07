import { TransactionStatus } from "@usedapp/core";
import React, { memo } from "react";
import { EditionNames } from '../constants';
import { PaginatedNFTs } from "./PaginatedNFTs";
import { Tab, TabChicklet, TabContainer, TabList, TabPanel } from "./Tabs";

type AppProps = {
  activeMintId: number | null;
  cost: string | number;
  currentTab: number;
  editionName: string;
  isNFTMinted: (id: number) => boolean;
  setActiveMintId: (id: number) => void;
  setCurrentTab: (id: number) => void;
  txState: TransactionStatus;
};

function AppComponent({
  isNFTMinted,
  setActiveMintId,
  cost,
  editionName,
  txState,
  activeMintId,
  setCurrentTab,
  currentTab,
}: AppProps) {
  return (
    <TabContainer defaultValue={0}>
      <TabList>
        <Tab
          onChange={(_e, value) => {
            setCurrentTab(Number(value));
          }}
        >
          <TabChicklet tabNum={0} currentTab={currentTab}>
            1
          </TabChicklet>
          Dark Edition
        </Tab>
        <Tab
          onChange={(_e, value) => {
            setCurrentTab(Number(value));
          }}
        >
          <TabChicklet tabNum={1} currentTab={currentTab}>
            2
          </TabChicklet>{" "}
          Light Edition
        </Tab>
      </TabList>

      <TabPanel value={0}>
        <PaginatedNFTs
          activeMintId={activeMintId}
          editionName={EditionNames.Dark}
          cost={cost}
          isNFTMinted={isNFTMinted}
          setActiveMintId={setActiveMintId}
          txState={txState}
        />
      </TabPanel>

      <TabPanel value={1}>
        <PaginatedNFTs
          activeMintId={activeMintId}
          cost={cost}
          editionName={EditionNames.Light}
          isNFTMinted={isNFTMinted}
          setActiveMintId={setActiveMintId}
          txState={txState}
        />
      </TabPanel>
    </TabContainer>
  );
}

export const App = memo(AppComponent);
