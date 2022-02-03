import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Blockies from "react-blockies";
import truncateEthAddress from "truncate-eth-address";
import { ToastState } from "./Toast";

type NavigationProps = {
  account?: string | null;
  activateBrowserWallet: () => void;
  toastState: ToastState;
  setToastState: (state: ToastState) => void;
};

export function Navigation({
  account,
  toastState,
  setToastState,
  activateBrowserWallet,
}: NavigationProps) {
  async function connectWallet() {
    try {
      await activateBrowserWallet();
    } catch (e) {
      if ("message" in e) {
        setToastState(e.message);
      }
      alert(JSON.stringify(e));
    }
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
        </div>
      ) : (
        <div>
          <Button
            onClick={connectWallet}
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
            Connect Wallet
          </Button>
        </div>
      )}

      {/* <button onClick={openNotice}>Open Notice</button> */}
      {/* <p>Max Mintable: {maxMintable ? maxMintable.toNumber() : 0}</p>
      <p>Cost: {cost ? utils.formatEther(cost) : 0}</p> */}
    </Box>
  );
}
