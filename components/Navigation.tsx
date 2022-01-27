import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import truncateEthAddress from "truncate-eth-address";
import Blockies from "react-blockies";

function onErrorHandler(e) {
  if (e.name === "UnsupportedChainIdError") {
    alert("Switch to Fantom Chain");
    return;
  } else {
    alert(e);
    return;
  }
}

export function Navigation({
  account,
  openNotice,
  activateBrowserWallet,
}: {
  account?: string | null;
  activateBrowserWallet: () => void;
  openNotice: () => void;
}) {
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
              background: "white",
              border: "none",
              color: "black",
              "&:hover": {
                background: "white",
              },
            }}
          >
            <Blockies className="blockie" seed={account} />
            {truncateEthAddress(account)}
          </Button>
        </div>
      ) : (
        <div>
          <Button
            onClick={() => activateBrowserWallet(onErrorHandler)}
            sx={{
              background: "white",
              border: "none",
              color: "black",
              "&:hover": {
                background: "white",
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