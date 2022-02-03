import { capitalize } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { TransactionStatus } from "@usedapp/core";
import Image from "next/image";
import { memo } from "react";
import { MintButton } from "./MintButton";
import { TocDisplay } from "./TocDisplay";

type NFTListProps = {
  cost: string | number;
  currentEdition: string;
  NFTItems: NFTMetaData[] | null;
  currentTab: number;
  isNFTMinted: (id: number) => boolean;
  activeMintId: number | null;
  setActiveMintId: (id: number) => void;
  sendSudoMintTX: (id: number) => void;
  txState: TransactionStatus;
};

function NFTListComponent({
  cost,
  currentEdition,
  NFTItems,
  currentTab,
  isNFTMinted,
  activeMintId,
  setActiveMintId,
  sendSudoMintTX,
  txState,
}: NFTListProps) {
  if (!NFTItems) return <div>loading</div>;

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {NFTItems.map((item) => {
        const [, leftCharacter, rightCharacter] = item.attributes.map(
          (attribute) => attribute.value
        );

        return (
          <Grid item xs={6} sm={4} md={4} lg={3} key={item.dna}>
            <Card className="nft-item">
              <CardContent sx={{ borderRadius: 0 }}>
                <CardMedia
                  sx={{
                    width: "100%",
                    borderRadius: "4px",
                    display: "flex",
                    overflow: "hidden",
                    border:
                      currentEdition === "light" ? "1px solid #e2e2e2" : "none",
                  }}
                >
                  <Image
                    src={`/images/${currentTab === 0 ? "light" : "dark"}/${
                      item.edition
                    }.png`}
                    alt="nft-image"
                    width={400}
                    height={400}
                  />
                </CardMedia>
                <Box className="monospaced" sx={{ my: 2 }}>
                  <span>
                    <TocDisplay first="ID" second={item.edition} />
                    <TocDisplay
                      first="Edition"
                      second={capitalize(item.variation)}
                    />
                    <TocDisplay first="Character Left" second={leftCharacter} />
                    <TocDisplay
                      first="Character Right"
                      second={rightCharacter}
                    />
                    <TocDisplay
                      first="Cost"
                      second={`${cost === 0 ? "?" : cost} FTM`}
                    />
                  </span>
                </Box>
                {process.env.LOCAL ? (
                  <MintButton
                    activeMintId={activeMintId}
                    item={item}
                    txState={txState}
                    setActiveMintId={setActiveMintId}
                    sendSudoMintTX={sendSudoMintTX}
                    isNFTMinted={isNFTMinted}
                  />
                ) : (
                  <MintButton
                    activeMintId={activeMintId}
                    item={item}
                    txState={txState}
                    setActiveMintId={setActiveMintId}
                    sendSudoMintTX={sendSudoMintTX}
                    isNFTMinted={isNFTMinted}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export const NFTList = memo(NFTListComponent);
