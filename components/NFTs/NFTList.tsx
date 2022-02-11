import Grid from "@mui/material/Grid";
import { NFT } from "./NFT";
import { memo } from "react";

type NFTListProps = {
  NFTCollection: NFTMetaData[] | [];
  activeMintId: number | null;
  cost: string | undefined;
  selectedEditionName: string;
  isNFTMinted: (id: number) => boolean;
  setActiveMintId: (id: number) => void;
  mintLoading: boolean | undefined;
};

function NFTListComponent({
  NFTCollection,
  activeMintId,
  cost,
  selectedEditionName,
  isNFTMinted,
  setActiveMintId,
  mintLoading,
}: NFTListProps) {
  if (!NFTCollection) return null;

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {NFTCollection.map((item) => {
        return (
          <NFT
            key={item.edition}
            selectedEditionName={selectedEditionName}
            item={item}
            activeMintId={activeMintId}
            cost={cost}
            isNFTMinted={isNFTMinted}
            setActiveMintId={setActiveMintId}
            mintLoading={mintLoading}
          />
        );
      })}
    </Grid>
  );
}

export const NFTList = memo(NFTListComponent);
