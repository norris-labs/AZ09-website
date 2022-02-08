import AZ09DarkABI from "../abi/AZ09-dark-abi.json";
import AZ09LightABI from "../abi/AZ09-light-abi.json";
import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";
import { useContractFunction } from "@usedapp/core";

const Az09LightContractInterface = new ethers.utils.Interface(AZ09LightABI);
const Az09DarkContractInterface = new ethers.utils.Interface(AZ09DarkABI);

const AZ09LightContractAddress: string = process.env
  .NEXT_PUBLIC_LIGHT_CONTRACT_ADDRESS as string;

const AZ09DarkContractAddress: string = process.env
  .NEXT_PUBLIC_DARK_CONTRACT_ADDRESS as string;

const AZ09LightContract = new Contract(
  AZ09LightContractAddress,
  Az09LightContractInterface
);

const AZ09DarkContract = new Contract(
  AZ09DarkContractAddress,
  Az09DarkContractInterface
);

export function useMint(contractTarget: string) {
  const contract =
    contractTarget === "dark" ? AZ09DarkContract : AZ09LightContract;

  const { state, send } = useContractFunction(contract, "mint", {});
  return { state, send };
}
