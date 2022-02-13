import { useContractWrite, useWaitForTransaction } from "wagmi";

import AZ09DarkABI from "../abi/AZ09-dark-abi.json";
import AZ09LightABI from "../abi/AZ09-light-abi.json";
import { ethers } from "ethers";

export function useMint({
  editionName,
  cost,
}: {
  editionName: string;
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

  const [submissionState, callMint] = useContractWrite(contractConfig, "mint");

  const [transactionState] = useWaitForTransaction({
    hash: submissionState.data?.hash,
  });

  function mintNFT(id: number) {
    if (!cost) return;
    const costInEth = ethers.utils.parseEther(cost);
    const mintArgs = {
      args: id,
      overrides: {
        value: costInEth,
      },
    };
    callMint(mintArgs);
  }

  return {
    transactionData: transactionState.data,
    transactionLoading: transactionState.loading,
    transactionError: transactionState.error,
    submissionData: submissionState.data,
    submissionLoading: submissionState.loading,
    submissionError: submissionState.error,
    mintNFT,
  };
}
