import { Tab, TabContainer, TabList, TabPanel } from './Tabs';

import Box from '@mui/material/Box';
import { PaginatedNFTs } from './PaginatedNFTs';
import React from 'react';
import { TransactionStatus } from '@usedapp/core';
import { memo } from 'react';

type ContentProps = {
  isNFTMinted: (id: number) => boolean;
  sendMintTX: (id: number) => void;
  sendSudoMintTX: (id: number) => void;
  setCurrentTab: (id: number) => void;
  txState: TransactionStatus;
  mintTarget: number | null;
  currentTab: number;
  cost: string | number;
};

function ContentComponent({
  isNFTMinted,
  sendMintTX,
  sendSudoMintTX,
  cost,
  txState,
  mintTarget,
  setCurrentTab,
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
          </TabChicklet>{' '}
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
          currentTab={currentTab}
          itemsPerPage={30}
          isNFTMinted={isNFTMinted}
          sendMintTX={sendMintTX}
          sendSudoMintTX={sendSudoMintTX}
          txState={txState}
          mintTarget={mintTarget}
        />
      </TabPanel>

      <TabPanel value={1}>
        <PaginatedNFTs
          cost={cost}
          currentTab={currentTab}
          itemsPerPage={30}
          isNFTMinted={isNFTMinted}
          sendMintTX={sendMintTX}
          sendSudoMintTX={sendSudoMintTX}
          txState={txState}
          mintTarget={mintTarget}
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
        background: `${currentTab === tabNum ? 'black' : 'white'}`,
        color: `${currentTab === tabNum ? 'white' : 'black'}`,
        width: '1.5rem',
        height: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        fontSize: '.95rem',
        marginRight: '5px',
      }}
    >
      {children}
    </Box>
  );
};

export const Content = memo(ContentComponent);
