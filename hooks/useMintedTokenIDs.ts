import contractABI from "../abi/contact-abi.json";
import { ethers, BigNumber } from "ethers";
import { useContractCall } from "@usedapp/core";

const simpleContractInterface = new ethers.utils.Interface(contractABI);

export function useMintedTokenIDs() {
  const [mintedTokenIDs]: Array<BigNumber>[] =
    useContractCall({
      abi: simpleContractInterface,
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
      method: "getMintedTokenIDs",
      args: [],
    }) ?? [];

  if (!mintedTokenIDs || mintedTokenIDs.length == 0) return [];
  return mintedTokenIDs.map((bigNum: BigNumber) => bigNum.toNumber());
}
