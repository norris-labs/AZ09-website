import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { NFTList } from "./NFTList";
import ReactPaginate from "react-paginate";
import { SearchBox } from "./SearchBox";
import { TransactionStatus } from "@usedapp/core";
import { metadata } from "../utils/metadata";

type PaginatedNFTs = {
  sendMintTX: (id: number) => void;
  isNFTMinted: (id: number) => boolean;
  itemsPerPage: number;
  mintTarget: number | null;
  txState: TransactionStatus;
  cost: string | number;
};

function PaginatedNFTsComponent({
  itemsPerPage,
  sendMintTX,
  isNFTMinted,
  mintTarget,
  cost,
  txState,
}: PaginatedNFTs) {
  const [currentItems, setCurrentItems] = useState<null | NFTMetaData[]>(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchText, setSearchText] = useState<null | string>(null);
  const [searchResults, setSearchResults] = useState<null | NFTMetaData[]>(
    null
  );

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    if (searchResults?.length) {
      setCurrentItems(searchResults.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(searchResults.length / itemsPerPage));
    } else {
      setCurrentItems(metadata.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(metadata.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, searchResults?.length]);

  function search() {
    if (searchText === "" || searchText === null) {
      setSearchResults(metadata);
      pushWindowHash(0);
      const newOffset = calcNewOffset(0, metadata);
      setItemOffset(newOffset);
      return;
    }

    const searchResult = metadata.filter(({ attrString }) => {
      return attrString.toLowerCase().includes(searchText.toLowerCase());
    });

    const newOffset = calcNewOffset(0, searchResult);

    setSearchResults(searchResult);
    pushWindowHash(0);
  }

  function calcNewOffset(pageNum: number, itemsToPaginate: NFTMetaData[]) {
    return (pageNum * itemsPerPage) % itemsToPaginate.length;
  }

  function handlePageClick(event: any, scrollToTop: boolean = false) {
    let newOffset;

    if (searchResults?.length) {
      newOffset = calcNewOffset(event.selected, searchResults);
    } else {
      newOffset = calcNewOffset(event.selected, metadata);
    }

    setItemOffset(newOffset);
    pushWindowHash(event.selected);
    setCurrentPage(event.selected);

    if (scrollToTop) {
      doScrollToTop();
    }
  }

  function pushWindowHash(num: string | number): void {
    window.location.hash = `#${num}`;
  }

  function doScrollToTop(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSearchChange(_searchText: string): void {
    setSearchText(_searchText);
  }

  return (
    <>
      <Box
        sx={{
          py: 4,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid container>
          <Grid item xs={6}>
            <Box
              sx={{
                height: "100%",
                fontSize: "1.25rem",
                padding: "15px",
                display: "flex",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              Page {currentPage} / {pageCount}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: "flex" }}>
              <SearchBox
                handleSearchChange={handleSearchChange}
                search={search}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <NFTList
        sendMintTX={sendMintTX}
        isNFTMinted={isNFTMinted}
        cost={cost}
        currentItems={currentItems}
        mintTarget={mintTarget}
        txState={txState}
      />
      <div className="pagination-wrapper">
        <ReactPaginate
          breakLabel="..."
          nextLabel="&rarr;"
          onPageChange={(e) => handlePageClick(e, true)}
          pageCount={pageCount}
          previousLabel="&larr;"
          pageLinkClassName="pagination-page-link"
          className="pagination-container"
        />
      </div>
    </>
  );
}
{
  /* <ReactPaginate
          breakLabel="..."
          nextLabel="&rarr;"
          marginPagesDisplayed={5}
          onPageChange={(e) => handlePageClick(e, false)}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="&larr;"
          pageLinkClassName="pagination-page-link"
          className="pagination-container"
        /> */
}

export const PaginatedNFTs = React.memo(PaginatedNFTsComponent);
