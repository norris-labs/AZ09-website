import * as React from "react";
import { useAccount } from "wagmi";
import truncateEthAddress from "truncate-eth-address";
import Blockies from "react-blockies";
import { GreyButton } from "../Buttons";

export const Account = () => {
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

  if (!accountData) return <div>No account connected</div>;

  return (
    <div>
      <div>
        <GreyButton onClick={() => disconnect()}>
          <Blockies size={6} className="blockie" seed={accountData.address} />
          {truncateEthAddress(accountData.address)}
        </GreyButton>
      </div>

      {/* <div>
        {accountData?.ens?.name ?? accountData?.address}
        {accountData?.ens ? ` (${accountData?.address})` : null}
      </div> */}

      {/* {accountData?.ens?.avatar && (
        <img src={accountData.ens.avatar} style={{ height: 40, width: 40 }} />
      )} */}
    </div>
  );
};
