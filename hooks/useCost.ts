import contractABI from "../abi/contact-abi.json";
import { ethers } from "ethers";
import { useContractCall } from "@usedapp/core";

const simpleContractInterface = new ethers.utils.Interface(contractABI);

export function useCost() {
  const [NFTCost]: any =
    useContractCall({
      abi: simpleContractInterface,
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
      method: "cost",
      args: [],
    }) ?? [];

  return NFTCost;
}
