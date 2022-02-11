import { useEffect, useState } from 'react';

import AZ09DarkABI from '../abi/AZ09-dark-abi.json';
import AZ09LightABI from '../abi/AZ09-light-abi.json';
import { BigNumber } from 'ethers';
import { EditionNames as editionNamesEnum } from '../constants';
import { useContractRead } from 'wagmi';

export function useMintedTokenIDs(editionName: string) {
  const [mintedTokenIds, setMintedTokenIds] = useState<number[]>([]);
  let address;
  let abi;

  if (editionName === editionNamesEnum.Dark) {
    address = process.env.NEXT_PUBLIC_DARK_CONTRACT_ADDRESS as string;
    abi = AZ09DarkABI;
  } else {
    address = process.env.NEXT_PUBLIC_LIGHT_CONTRACT_ADDRESS as string;
    abi = AZ09LightABI;
  }

  const [{ data, error, loading }, read] = useContractRead(
    {
      addressOrName: address,
      contractInterface: abi,
    },
    'getMintedTokenIDs',
    {
      watch: true,
    }
  );

  useEffect(() => {
    if (!data) return;

    const newMintedIDs = data.map((id: BigNumber) => id.toNumber());
    setMintedTokenIds(newMintedIDs);
  }, [editionName, loading]);

  return mintedTokenIds;
}
