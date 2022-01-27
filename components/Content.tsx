import { TransactionStatus } from "@usedapp/core";
import { PaginatedNFTs } from "./PaginatedNFTs";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";

const Tab = styled(TabUnstyled)`
  color: white;
  cursor: pointer;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  align-content: center;
  font-size: 1.45rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 20px;
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
  background-color: #333232;
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
  txState,
  mintTarget,
}: {
  isNFTMinted: (id: number) => boolean;
  sendMintTX: (id: number) => void;
  txState: TransactionStatus;
  mintTarget: number | null;
}) {
  return (
    <TabsUnstyled defaultValue={0}>
      <TabList>
        <Tab>(1) Light Edition</Tab>
        <Tab>(2) Dark Edition</Tab>
      </TabList>

      <TabPanel value={0}>
        <PaginatedNFTs
          itemsPerPage={30}
          isNFTMinted={isNFTMinted}
          sendMintTX={sendMintTX}
          txState={txState}
          mintTarget={mintTarget}
        />
      </TabPanel>

      <TabPanel value={1}>Other One</TabPanel>
    </TabsUnstyled>
  );
}

{
  /* <Box
          sx={{
            pt: 1,
          }}
        >
        </Box> */
}
