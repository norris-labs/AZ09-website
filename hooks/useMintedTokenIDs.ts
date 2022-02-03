import { BigNumber, ethers } from 'ethers';

import AZ09LightABI from '../abi/AZ09-light-abi.json';
import { useContractCall } from '@usedapp/core';

const simpleContractInterface = new ethers.utils.Interface(AZ09LightABI);

export function useMintedTokenIDs() {
  const [mintedTokenIDs]: Array<BigNumber>[] =
    useContractCall({
      abi: simpleContractInterface,
      address: process.env.NEXT_PUBLIC_LIGHT_CONTRACT_ADDRESS as string,
      method: 'getMintedTokenIDs',
      args: [],
    }) ?? [];

  if (!mintedTokenIDs || mintedTokenIDs.length == 0) return [];
  return mintedTokenIDs.map((bigNum: BigNumber) => bigNum.toNumber());
}
