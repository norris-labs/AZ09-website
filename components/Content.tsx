import { Fragment, SyntheticEvent, useState } from "react";

import { PaginatedNFTs } from "./PaginatedNFTs";
// import { Tab } from "@mui/material";
import { styled } from "@mui/system";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  align-content: center;
  font-size: 1.25rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 25px;
  border: none;
  display: flex;
  justify-content: center;
  outline: none;

  &:hover {
    background-color: #555555;
  }

  &:focus {
    color: #fff;
    outline: none;
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: white;
    color: black;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: #3d3d3d;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  border-radius: 5px;
  overflow: hidden;
`;

export function Content({
  isNFTMinted,
  sendMintTX,
}: {
  isNFTMinted: (id: number) => boolean;
  sendMintTX: (id: number) => void;
}) {
  return (
    <TabsUnstyled defaultValue={0}>
      <TabList>
        <Tab>Light Edition</Tab>
        <Tab>Dark Edition</Tab>
      </TabList>

      <TabPanel value={0}>
        <Box
          sx={{
            py: 5,
          }}
        >
          <PaginatedNFTs
            itemsPerPage={25}
            isNFTMinted={isNFTMinted}
            sendMintTX={sendMintTX}
          />
        </Box>
      </TabPanel>

      <TabPanel value={1}>Other One</TabPanel>
    </TabsUnstyled>
  );
}
