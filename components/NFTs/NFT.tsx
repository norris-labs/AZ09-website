import { capitalize } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { memo } from "react";
import { MintButton } from "../Buttons/MintButton";
import { TocDisplay } from "../UI/TocDisplay";

type NFTProps = {
  item: NFTMetaData;
  activeMintId: number | null;
  selectedEditionName: string;
  cost: string | undefined;
  isNFTMinted: (id: number) => boolean;
  setActiveMintId: (id: number) => void;
  loading: boolean | undefined;
};

function NFTComponent({
  item,
  activeMintId,
  cost,
  selectedEditionName,
  isNFTMinted,
  setActiveMintId,
  loading,
}: NFTProps) {
  const [, leftCharacter, rightCharacter] = item.attributes.map(
    (attribute) => attribute.value
  );

  return (
    <Grid item xs={6} sm={6} md={4} lg={3} key={item.dna}>
      <Card className="nft-item">
        <CardContent sx={{ borderRadius: 0 }}>
          <CardMedia
            sx={{
              width: "100%",
              borderRadius: "4px",
              display: "flex",
              overflow: "hidden",
              border: item.variation === "light" ? "1px solid #e2e2e2" : "none",
            }}
          >
            <Image
              src={`/images/${item.variation}/${item.edition}.png`}
              alt="nft-image"
              width={400}
              height={400}
            />
          </CardMedia>
          <Box className="monospaced" sx={{ my: 2 }}>
            <span>
              <TocDisplay first="ID" second={item.edition} />
              <TocDisplay first="Edition" second={capitalize(item.variation)} />
              <TocDisplay first="Character Left" second={leftCharacter} />
              <TocDisplay first="Character Right" second={rightCharacter} />
              <TocDisplay
                first="Cost"
                second={`${Number(cost) === 0 ? "?" : cost} FTM`}
              />
            </span>
          </Box>
          <MintButton
            selectedEditionName={selectedEditionName}
            activeMintId={activeMintId}
            id={item.edition}
            loading={loading}
            setActiveMintId={setActiveMintId}
            isNFTMinted={isNFTMinted}
          />
        </CardContent>
      </Card>
    </Grid>
  );
}

export const NFT = memo(NFTComponent);
