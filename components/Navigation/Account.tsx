import * as React from "react";
import { useAccount } from "wagmi";
import truncateEthAddress from "truncate-eth-address";
import Blockies from "react-blockies";
import { GreyButton } from "../Buttons/GreyButton";
import { memo } from "react";

export const AccountComponent = () => {
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
    </div>
  );
};

export const Account = memo(AccountComponent);
