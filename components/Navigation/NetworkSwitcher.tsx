import * as React from "react";
import { useNetwork } from "wagmi";
import { GreyButton } from "../Buttons/GreyButton";

export const NetworkSwitcher = () => {
  const [
    { data: networkData, error: switchNetworkError },
    switchNetwork,
  ] = useNetwork();

  return (
    <div>
      {/* <div>
        Connected to {networkData.chain?.name ?? networkData.chain?.id}{" "}
        {networkData.chain?.unsupported && "(unsupported)"}
      </div> */}

      {switchNetwork &&
        networkData.chains.map((x) =>
          x.id === networkData.chain?.id ? null : (
            <GreyButton key={x.id} onClick={() => switchNetwork(x.id)}>
              Switch to {x.name}
            </GreyButton>
          )
        )}

      {switchNetworkError && switchNetworkError?.message}
    </div>
  );
};
