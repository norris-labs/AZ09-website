import * as React from "react";
import { TransactionStatus } from "@usedapp/core";
import { memo, useCallback } from "react";
import { LoadingButton } from "./LoadingButton";
import { LinkButton } from "./LinkButton";
import { ActionButton } from "./ActionButton";

type MintButtonProps = {
  txState: TransactionStatus;
  edition: number;
  setActiveMintId: (id: number) => void;
  activeMintId: number | null;
  isNFTMinted: (id: number) => boolean;
};

function MintButtonComponent({
  edition,
  txState,
  setActiveMintId,
  isNFTMinted,
  activeMintId,
}: MintButtonProps) {
  const handleMintBtnClick = useCallback(() => {
    setActiveMintId(edition);
  }, [edition]);

  if (txState?.status === "PendingSignature" && activeMintId === edition) {
    return <LoadingButton />;
  }
  debugger;
  return isNFTMinted(edition) ? (
    <LinkButton
      href={`${process.env.NEXT_PUBLIC_PAINTSWAP_COLLECTION_URL}/${edition}`}
      target="_blank"
    >
      View on PaintSwap
    </LinkButton>
  ) : (
    <ActionButton variant="contained" onClick={handleMintBtnClick}>
      {process.env.NEXT_PUBLIC_USE_SUDO_MINT ? "Sudo Mint" : "Mint"}
    </ActionButton>
  );
}

export const MintButton = memo(MintButtonComponent);
