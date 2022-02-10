import Grid from "@mui/material/Grid";
import { TransactionStatus } from "@usedapp/core";
import { memo } from "react";
import { NFT } from "./NFT";

type NFTListProps = {
  NFTCollection: NFTMetaData[] | [];
  activeMintId: number | null;
  cost: string | number;
  isNFTMinted: (id: number) => boolean;
  setActiveMintId: (id: number) => void;
  txState: TransactionStatus;
};

function NFTListComponent({
  NFTCollection,
  activeMintId,
  cost,
  isNFTMinted,
  setActiveMintId,
  txState,
}: NFTListProps) {
  if (!NFTCollection) return null;

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {NFTCollection.map((item) => {
        return (
          <NFT
            item={item}
            activeMintId={activeMintId}
            cost={cost}
            isNFTMinted={isNFTMinted}
            setActiveMintId={setActiveMintId}
            txState={txState}
          />
        );
      })}
    </Grid>
  );
}

export const NFTList = memo(NFTListComponent);
