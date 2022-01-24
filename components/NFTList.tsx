import Image from "next/image";
import metadata from "../data/json/_metadata.json";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

type NFTListProps = {
  sendMintTX: (id: number) => void;
  isNFTMinted: (id: number) => void;
};

export function NFTList({ sendMintTX, isNFTMinted }: NFTListProps) {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {metadata.map((nftData) => {
        const [, leftCharacter, rightCharacter] = nftData.attributes.map(
          (attribute) => attribute.value
        );
        return (
          <Grid item xs={6} sm={4} md={4} lg={3} key={nftData.dna}>
            <Card variant="outlined">
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
                      src={`/images/${nftData.edition}.png`}
                      alt="me"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </CardMedia>
                <Box sx={{ my: 3 }}>
                  <span className="color-secondary">
                    Edition: {nftData.edition}
                    <br />
                    Variation: {nftData.variation}
                    <br />
                    Character Left: {leftCharacter}
                    <br />
                    Character Right: {rightCharacter}
                    <br />
                    {/* Is Minted: {isNFTMinted(nftData.edition)} */}
                  </span>
                </Box>
                <Button
                  style={{ width: "100%" }}
                  variant="outlined"
                  onClick={() => sendMintTX(nftData.edition)}
                >
                  Mint
                </Button>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
