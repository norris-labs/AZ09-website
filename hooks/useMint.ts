import { Contract } from "@ethersproject/contracts";
import contractABI from "../abi/contact-abi.json";
import { ethers } from "ethers";
import { useContractFunction } from "@usedapp/core";

const simpleContractInterface = new ethers.utils.Interface(contractABI);

const contract = new Contract(
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
  simpleContractInterface
);

export function useMint() {
  const { state, send } = useContractFunction(contract, "mint", {});
  return { state, send };
}
