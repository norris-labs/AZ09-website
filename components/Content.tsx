import { Tab, TabContainer, TabList, TabPanel } from "./Tabs";

import Box from "@mui/material/Box";
import { PaginatedNFTs } from "./PaginatedNFTs";
import { TransactionStatus } from "@usedapp/core";
import { useState } from "react";

type ContentProps = {
  isNFTMinted: (id: number) => boolean;
  sendMintTX: (id: number) => void;
  txState: TransactionStatus;
  mintTarget: number | null;
  cost: string | number;
};

export function Content({
  isNFTMinted,
  sendMintTX,
  cost,
  txState,
  mintTarget,
}: ContentProps) {
  const [currentTab, setCurrentTab] = useState<number | string>(0);

  return (
    <TabContainer defaultValue={0}>
      <TabList>
        <Tab
          onChange={(_e, value) => {
            setCurrentTab(value);
          }}
        >
          <Box
            sx={{
              background: `${currentTab === 0 ? "black" : "white"}`,
              color: `${currentTab === 0 ? "white" : "black"}`,
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
            1
          </Box>{" "}
          Light Edition
        </Tab>
        <Tab
          onChange={(_e, value) => {
            setCurrentTab(value);
          }}
        >
          <Box
            sx={{
              background: `${currentTab === 1 ? "black" : "white"}`,
              color: `${currentTab === 1 ? "white" : "black"}`,
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
            2
          </Box>
          Dark Edition
        </Tab>
      </TabList>

      <TabPanel value={0}>
        <PaginatedNFTs
          cost={cost}
          itemsPerPage={30}
          isNFTMinted={isNFTMinted}
          sendMintTX={sendMintTX}
          txState={txState}
          mintTarget={mintTarget}
        />
      </TabPanel>

      <TabPanel value={1}>Other One</TabPanel>
    </TabContainer>
  );
}
