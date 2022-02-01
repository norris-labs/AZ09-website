import { useContractCall } from "@usedapp/core";
import { ethers } from "ethers";
import AZ09LightABI from "../abi/AZ09-light-abi.json";

const simpleContractInterface = new ethers.utils.Interface(AZ09LightABI);

export function useMaxMintable() {
  const [maxMintable]: any =
    useContractCall({
      abi: simpleContractInterface,
      address: process.env.NEXT_PUBLIC_LIGHT_CONTRACT_ADDRESS as string,
      method: "maxMintable",
      args: [],
    }) ?? [];

  return maxMintable;
}
