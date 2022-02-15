import { GreyButton } from "../Buttons/GreyButton";
import { Account } from "./Account";
import { Connect } from "./Connect";
import { NetworkSwitcher } from "./NetworkSwitcher";
import Box from "@mui/material/Box";
import { AlertState } from "../UI/Alert";
import { AccountType, NetworkType } from "../../global";

export { Account, GreyButton, Connect, NetworkSwitcher };

type NavigationProps = {
  accountData: AccountType;
  networkData: NetworkType;
  setAlertState: (state: AlertState) => void;
};

export function Navigation({
  accountData,
  networkData,
  setAlertState,
}: NavigationProps) {
  return (
    <Box
      sx={{
        mt: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
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
