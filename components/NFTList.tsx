import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { NFTMetaData } from "./PaginatedNFTs";
import { TransactionStatus } from "@usedapp/core";

type NFTListProps = {
  currentItems: NFTMetaData[] | null;
  sendMintTX: (id: number) => void;
  isNFTMinted: (id: number) => boolean;
  txState: TransactionStatus;
  mintTarget: number | null;
};

export function NFTList({
  currentItems,
  sendMintTX,
  isNFTMinted,
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
                <Box sx={{ my: 2 }}>
                  <span>
                    ID: {item.edition}
                    <br />
                    Edition: {item.variation}
                    <br />
                    Character Left: {leftCharacter}
                    <br />
                    Character Right: {rightCharacter}
                    <br />
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

type MintButtonProps = {
  txState: TransactionStatus;
  item: NFTMetaData;
  sendMintTX: (id: number) => void;
  mintTarget: number | null;
  isNFTMinted: (id: number) => boolean;
};

function MintButton({
  item,
  txState,
  sendMintTX,
  isNFTMinted,
  mintTarget,
}: MintButtonProps) {
  if (txState?.status === "PendingSignature" && mintTarget === item.edition) {
    return (
      <LoadingButton
        style={{ width: "100%" }}
        loading
        variant="contained"
        disabled={false}
      >
        Waiting for signature
      </LoadingButton>
    );
  }
  return isNFTMinted(item.edition) ? (
    <Button
      style={{ width: "100%" }}
      variant="outlined"
      endIcon={<OpenInNewIcon />}
    >
      Already Minteed
    </Button>
  ) : (
    <Button
      style={{ width: "100%" }}
      variant="contained"
      onClick={() => sendMintTX(item.edition)}
    >
      Mint
    </Button>
  );
}
