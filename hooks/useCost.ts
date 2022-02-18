import { useEffect, useState } from "react";

import AZ09DarkABI from "../abi/AZ09-dark-abi.json";
import AZ09LightABI from "../abi/AZ09-light-abi.json";
import { useContractRead } from "wagmi";
import { EditionNames as editionNamesEnum } from "../constants";
import { utils } from "ethers";

export function useCost(editionName: string) {
  let address;
  let abi;

  if (editionName === editionNamesEnum.Dark) {
    address = process.env.NEXT_PUBLIC_DARK_CONTRACT_ADDRESS as string;
    abi = AZ09DarkABI;
  } else {
    address = process.env.NEXT_PUBLIC_LIGHT_CONTRACT_ADDRESS as string;
    abi = AZ09LightABI;
  }

  const [cost, setCost] = useState<string>();
  const [{ data, error, loading }, read] = useContractRead(
    {
      addressOrName: address,
      contractInterface: abi,
    },
    "cost",
    {
      watch: true,
    }
  );

  useEffect(() => {
    if (!data) return;
    setCost(utils.formatEther(data));
  }, [data]);

  return cost;
}
