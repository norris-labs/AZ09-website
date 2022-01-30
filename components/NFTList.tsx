import Box from "@mui/material/Box";
import { capitalize } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { TransactionStatus } from "@usedapp/core";
import { MintButton } from "./MintButton";
import { TocDisplay } from "./TocDisplay";

type NFTListProps = {
  currentItems: NFTMetaData[] | null;
  sendMintTX: (id: number) => void;
  isNFTMinted: (id: number) => boolean;
  txState: TransactionStatus;
  mintTarget: number | null;
  cost: string | number;
};

export function NFTList({
  currentItems,
  sendMintTX,
  isNFTMinted,
  cost,
  mintTarget,
  txState,
}: NFTListProps) {
  if (!currentItems) return <div>loading</div>;

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {currentItems.map((item) => {
        const [, leftCharacter, rightCharacter] = item.attributes.map(
          (attribute) => attribute.value
        );

        return (
          <Grid item xs={6} sm={4} md={4} lg={3} key={item.dna}>
            <Card className="nft-item">
              <CardContent>
                <CardMedia>
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={`/images/${item.edition}.png`}
                      alt="me"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
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
                <MintButton
                  mintTarget={mintTarget}
                  item={item}
                  txState={txState}
                  sendMintTX={sendMintTX}
                  isNFTMinted={isNFTMinted}
                />
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
