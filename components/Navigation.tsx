import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Blockies from "react-blockies";
import truncateEthAddress from "truncate-eth-address";
import { theme } from "../utils/theme";
import { Fantom, ChainId } from "@usedapp/core";

type NavigationProps = {
  account?: string | null;
  chainId?: ChainId;
  activateBrowserWallet: () => void;
};

function WrongNetwork() {
  return (
    <Button
      disableRipple
      sx={{
        borderRadius: "100px",
        background: theme.palette.primary.main,
        border: "none",
        padding: "10px 15px",
        fontSize: "1rem",
        color: "black",
        "&:hover": {
          cursor: "default",
          background: theme.palette.primary.main,
        },
      }}
    >
      <Box sx={{ paddingRight: "10px" }}>Wrong Network (switch to Fantom)</Box>
    </Button>
  );
}

function ConnectedWalletButton({
  account,
  chainId,
}: {
  chainId?: ChainId;
  account: string;
}) {
  if (account && Number(chainId) !== Fantom.chainId) {
    return <WrongNetwork />;
  }

  return (
    <Button
      sx={{
        background: "#333232",
        border: "none",
        padding: "10px 15px",
        fontSize: "1rem",
        color: "white",
        "&:hover": {
          background: "#555555",
        },
      }}
    >
      <Blockies size={6} className="blockie" seed={account} />
      {truncateEthAddress(account)}
    </Button>
  );
}

function DisconnectedWalletButton({
  handleWalletConnect,
}: {
  handleWalletConnect: () => void;
}) {
  return (
    <Button
      onClick={handleWalletConnect}
      sx={{
        background: theme.palette.primary.main,
        border: "none",
        padding: "10px 15px",
        fontSize: "1rem",
        color: "black",
        "&:hover": {
          background: theme.palette.primary.main,
        },
      }}
    >
      Connect Wallet
    </Button>
  );
}

export function Navigation({
  account,
  chainId,
  activateBrowserWallet,
}: NavigationProps) {
  async function connectWallet() {
    await activateBrowserWallet();
  }

  return (
    <Box
      sx={{
        mt: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      {account ? (
        <div>
          <ConnectedWalletButton chainId={chainId} account={account} />
        </div>
      ) : (
        <div>
          <DisconnectedWalletButton handleWalletConnect={connectWallet} />
        </div>
      )}
    </Box>
  );
}
