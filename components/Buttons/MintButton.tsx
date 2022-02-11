import * as React from "react";

import { memo, useCallback } from "react";

import { ActionButton } from "./ActionButton";
import { LinkButton } from "./LinkButton";
import { LoadingButton } from "./LoadingButton";

enum Copy {
  AlreadyMinted = "View on PaintSwap",
  Mint = "Mint",
}

type MintButtonProps = {
  mintLoading: boolean | undefined;
  id: number;
  selectedEditionName: string;
  setActiveMintId: (id: number) => void;
  activeMintId: number | null;
  isNFTMinted: (id: number) => boolean;
};

function MintButtonComponent({
  id,
  mintLoading,
  setActiveMintId,
  isNFTMinted,
  activeMintId,
  selectedEditionName,
}: MintButtonProps) {
  const handleMintBtnClick = useCallback(() => {
    setActiveMintId(id);
  }, [id]);

  if (mintLoading && activeMintId === id) {
    return <LoadingButton />;
  }

  const contractAddress =
    selectedEditionName === "dark"
      ? process.env.NEXT_PUBLIC_DARK_CONTRACT_ADDRESS
      : process.env.NEXT_PUBLIC_LIGHT_CONTRACT_ADDRESS;

  return isNFTMinted(id) ? (
    <LinkButton
      href={`${process.env.NEXT_PUBLIC_PAINTSWAP_COLLECTION_URL}/${contractAddress}/${id}`}
      target="_blank"
    >
      {Copy.AlreadyMinted}
    </LinkButton>
  ) : (
    <ActionButton
      disableRipple
      variant="contained"
      onClick={handleMintBtnClick}
    >
      {Copy.Mint}
    </ActionButton>
  );
}

export const MintButton = memo(MintButtonComponent);
