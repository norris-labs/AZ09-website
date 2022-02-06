import { TransactionStatus } from "@usedapp/core";
import React, { memo } from "react";
import { metadata as metadataDark } from "../utils/metadata_dark";
import { metadata as metadataLight } from "../utils/metadata_light";
import { PaginatedNFTs } from "./PaginatedNFTs";
import { Tab, TabChicklet, TabContainer, TabList, TabPanel } from "./Tabs";

type AppProps = {
  activeMintId: number | null;
  cost: string | number;
  editionName: string;
  currentTab: number;
  isNFTMinted: (id: number) => boolean;
  setActiveMintId: (id: number) => void;
  setCurrentTab: (id: number) => void;
  txState: TransactionStatus;
};

function AppComponent({
  isNFTMinted,
  setActiveMintId,
  cost,
  txState,
  activeMintId,
  setCurrentTab,
  editionName,
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
          NFTList={metadataDark}
          activeMintId={activeMintId}
          cost={cost}
          isNFTMinted={isNFTMinted}
          itemsPerPage={30}
          setActiveMintId={setActiveMintId}
          txState={txState}
        />
      </TabPanel>

      <TabPanel value={1}>
        <PaginatedNFTs
          NFTList={metadataLight}
          activeMintId={activeMintId}
          cost={cost}
          isNFTMinted={isNFTMinted}
          itemsPerPage={30}
          setActiveMintId={setActiveMintId}
          txState={txState}
        />
      </TabPanel>
    </TabContainer>
  );
}

export const App = memo(AppComponent);
