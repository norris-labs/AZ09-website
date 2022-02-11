import { useEffect, useState } from 'react';

import AZ09LightABI from '../abi/AZ09-light-abi.json';
import { useContractRead } from 'wagmi';
import { utils } from 'ethers';

export function useCost() {
  const [cost, setCost] = useState<string>();

  const [{ data, error, loading }, read] = useContractRead(
    {
      addressOrName: process.env.NEXT_PUBLIC_LIGHT_CONTRACT_ADDRESS as string,
      contractInterface: AZ09LightABI,
    },
    'cost'
  );

  useEffect(() => {
    if (!data) return;
    setCost(utils.formatEther(data));
  }, [loading]);

  return cost;
}
