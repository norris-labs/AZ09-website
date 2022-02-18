import { AccountType, NetworkType } from '../../global';

import { Account } from './Account';
import { AlertState } from '../UI/Alert';
import Box from '@mui/material/Box';
import { Connect } from './Connect';
import { GreyButton } from '../Buttons/GreyButton';
import { NetworkSwitcher } from './NetworkSwitcher';

export { Account, GreyButton, Connect, NetworkSwitcher };

type NavigationProps = {
  accountData: AccountType;
  networkData: NetworkType;
  selectedEditionName: string;
  setAlertState: (state: AlertState) => void;
};

export function Navigation({
  accountData,
  networkData,
  setAlertState,
  selectedEditionName,
}: NavigationProps) {
  return (
    <Box
      sx={{
        mt: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}
    >
      <GreyButton sx={{ marginRight: '12px' }}>
        <a
          target='_blank'
          href={
            selectedEditionName === 'dark'
              ? `https://paintswap.finance/marketplace/collections/${process.env.NEXT_PUBLIC_DARK_CONTRACT_ADDRESS}`
              : `https://paintswap.finance/marketplace/collections/${process.env.NEXT_PUBLIC_LIGHT_CONTRACT_ADDRESS}`
          }
        >
          View on Paintswap {selectedEditionName === 'dark' ? '(D)' : '(L)'}
        </a>
      </GreyButton>
      {accountData?.address ? (
        <>
          {networkData?.data?.chain?.unsupported ? (
            <NetworkSwitcher setAlertState={setAlertState} />
          ) : (
            <Account />
          )}
        </>
      ) : (
        <Connect setAlertState={setAlertState} />
      )}
    </Box>
  );
}
