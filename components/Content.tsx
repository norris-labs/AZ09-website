import Box from "@mui/material/Box";
import { TransactionStatus } from "@usedapp/core";
import React, { memo } from "react";
import { PaginatedNFTs } from "./PaginatedNFTs";
import { Tab, TabContainer, TabList, TabPanel } from "./Tabs";

type ContentProps = {
  activeMintId: number | null;
  cost: string | number;
  currentEdition: string;
  currentTab: number;
  isNFTMinted: (id: number) => boolean;
  setActiveMintId: (id: number) => void;
  sendSudoMintTX: (id: number) => void;
  setCurrentTab: (id: number) => void;
  txState: TransactionStatus;
};

function ContentComponent({
  isNFTMinted,
  setActiveMintId,
  sendSudoMintTX,
  cost,
  txState,
  activeMintId,
  setCurrentTab,
  currentEdition,
  currentTab,
}: ContentProps) {
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
          </TabChicklet>{" "}
          Light Edition
        </Tab>
        <Tab
          onChange={(_e, value) => {
            setCurrentTab(Number(value));
          }}
        >
          <TabChicklet tabNum={1} currentTab={currentTab}>
            2
          </TabChicklet>
          Dark Edition
        </Tab>
      </TabList>

      <TabPanel value={0}>
        <PaginatedNFTs
          cost={cost}
          currentEdition={currentEdition}
          currentTab={currentTab}
          itemsPerPage={30}
          isNFTMinted={isNFTMinted}
          setActiveMintId={setActiveMintId}
          sendSudoMintTX={sendSudoMintTX}
          txState={txState}
          activeMintId={activeMintId}
        />
      </TabPanel>

      <TabPanel value={1}>
        <PaginatedNFTs
          cost={cost}
          currentTab={currentTab}
          currentEdition={currentEdition}
          itemsPerPage={30}
          isNFTMinted={isNFTMinted}
          setActiveMintId={setActiveMintId}
          sendSudoMintTX={sendSudoMintTX}
          txState={txState}
          activeMintId={activeMintId}
        />
      </TabPanel>
    </TabContainer>
  );
}

const TabChicklet: React.FC<{ currentTab: number; tabNum: number }> = ({
  children,
  currentTab,
  tabNum,
}) => {
  return (
    <Box
      sx={{
        background: `${currentTab === tabNum ? "black" : "white"}`,
        color: `${currentTab === tabNum ? "white" : "black"}`,
        width: "1.5rem",
        height: "1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "100%",
        fontSize: ".95rem",
        marginRight: "5px",
      }}
    >
      {children}
    </Box>
  );
};

export const Content = memo(ContentComponent);
