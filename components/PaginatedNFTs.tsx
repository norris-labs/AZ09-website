import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import ReactPaginate from "react-paginate";
// import { Typography } from "@mui/material";
import metadata from "../data/json/_metadata.json";

type Attribute = {
  trait_type: string;
  value: string;
};

type NFTMetaData = {
  name: string;
  description: string;
  image: string;
  dna: string;
  edition: number;
  date: number;
  variation: string;
  attributes: Attribute[];
  compiler: string;
};

const nfts: NFTMetaData[] = metadata;

type PaginatedNFTs = {
  sendMintTX: (id: number) => void;
  isNFTMinted: (id: number) => boolean;
  itemsPerPage: number;
};

export function PaginatedNFTs({
  itemsPerPage,
  sendMintTX,
  isNFTMinted,
}: PaginatedNFTs) {
  const [currentItems, setCurrentItems] = useState<null | NFTMetaData[]>(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(nfts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(nfts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % nfts.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
    setItemOffset(newOffset);
    // window.location = `#${itemOffset}`;
  };

  return (
    <>
      <NFTList
        sendMintTX={sendMintTX}
        isNFTMinted={isNFTMinted}
        currentItems={currentItems}
      />
      <div className="pagination-wrapper">
        <ReactPaginate
          breakLabel="..."
          nextLabel="&rarr;"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="&larr;"
          pageLinkClassName="pagination-page-link"
          className="pagination-container"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}

type NFTListProps = {
  currentItems: NFTMetaData[] | null;
  sendMintTX: (id: number) => void;
  isNFTMinted: (id: number) => boolean;
};

function NFTList({ currentItems, sendMintTX, isNFTMinted }: NFTListProps) {
  if (!currentItems) return <div>loading</div>;

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {currentItems.map((item) => {
        const [, leftCharacter, rightCharacter] = item.attributes.map(
          (attribute) => attribute.value
        );

        return (
          <Grid item xs={6} sm={4} md={4} lg={3} key={item.dna}>
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
                      src={`/images/${item.edition}.png`}
                      alt="me"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </CardMedia>
                <Box sx={{ my: 3 }}>
                  <span className="color-secondary">
                    Edition: {item.edition}
                    <br />
                    Variation: {item.variation}
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
                  onClick={() => sendMintTX(item.edition)}
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
