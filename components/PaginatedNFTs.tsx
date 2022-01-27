import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Box from "@mui/material/Box";
import { NFTList } from "./NFTList";
import metadata from "../data/json/_metadata.json";
import { TransactionStatus } from "@usedapp/core";

export type Attribute = {
  trait_type: string;
  value: string;
};

export type NFTMetaData = {
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
  mintTarget: number | null;
  txState: TransactionStatus;
};

export function PaginatedNFTs({
  itemsPerPage,
  sendMintTX,
  isNFTMinted,
  mintTarget,
  txState,
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

  const handlePageClick = (event: any, scrollToTop: boolean = false) => {
    const newOffset = (event.selected * itemsPerPage) % nfts.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setItemOffset(newOffset);
    // window.location = `#${itemOffset}`;
  };

  return (
    <>
      <Box
        sx={{
          py: 4,
        }}
      >
        <ReactPaginate
          breakLabel="..."
          nextLabel="&rarr;"
          onPageChange={(e) => handlePageClick(e, false)}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="&larr;"
          pageLinkClassName="pagination-page-link"
          className="pagination-container"
        />
      </Box>
      <NFTList
        sendMintTX={sendMintTX}
        isNFTMinted={isNFTMinted}
        currentItems={currentItems}
        mintTarget={mintTarget}
        txState={txState}
      />
      <div className="pagination-wrapper">
        <ReactPaginate
          breakLabel="..."
          nextLabel="&rarr;"
          onPageChange={(e) => handlePageClick(e, true)}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="&larr;"
          pageLinkClassName="pagination-page-link"
          className="pagination-container"
        />
      </div>
    </>
  );
}
