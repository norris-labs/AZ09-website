import { useContractWrite, useWaitForTransaction } from "wagmi";
import { useNetwork } from "wagmi";
import { BigNumber } from "ethers";
import AZ09DarkABI from "../abi/AZ09-dark-abi.json";
import AZ09LightABI from "../abi/AZ09-light-abi.json";
import { ethers } from "ethers";

type UserBalanceType =
  | {
      decimals: number;
      formatted: string;
      symbol: string;
      value: BigNumber;
    }
  | undefined;

export function useMint({
  editionName,
  cost,
  userFunds,
}: {
  editionName: string;
  userFunds: UserBalanceType;
  cost: string | undefined;
}) {
  const abi = editionName === "dark" ? AZ09DarkABI : AZ09LightABI;
  const address =
    editionName === "dark"
      ? (process.env.NEXT_PUBLIC_DARK_CONTRACT_ADDRESS as string)
      : (process.env.NEXT_PUBLIC_LIGHT_CONTRACT_ADDRESS as string);

  const contractConfig = {
    addressOrName: address,
    contractInterface: abi,
  };

  const [networkData, _] = useNetwork();
  const [writeResult, write] = useContractWrite(contractConfig, "mint");
  const [waitResult] = useWaitForTransaction({
    confirmations: 3,
    hash: writeResult.data?.hash,
  });

  const {
    data: writeData,
    error: writeError,
    loading: writeLoading,
  } = writeResult;

  const { data: waitData, error: waitError, loading: waitLoading } = waitResult;

  function mintNFT(id: number) {
    if (networkData?.data?.chain?.unsupported) {
      alert("Network not supported");
      return;
    }

    if (!cost) return;
    const costInEth = ethers.utils.parseEther(cost);

    if (Number(userFunds?.formatted) < Number(cost)) {
      alert("not enough FTM");
      return;
    }

    const mintArgs = {
      args: id,
      overrides: {
        value: costInEth,
      },
    };
    write(mintArgs);
  }

  return {
    writeLoading,
    waitLoading,
    writeData,
    waitData,
    error: writeError || waitError,
    mintNFT,
  };
}
