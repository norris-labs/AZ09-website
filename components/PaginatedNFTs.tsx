import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TransactionStatus } from "@usedapp/core";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { metadata as metadataDark } from "../utils/metadata_dark";
import { metadata as metadataLight } from "../utils/metadata_light";
import { NFTList } from "./NFTList";
import { SearchBox } from "./SearchBox";

type PaginatedNFTs = {
  sendMintTX: (id: number) => void;
  sendSudoMintTX: (id: number) => void;
  isNFTMinted: (id: number) => boolean;
  itemsPerPage: number;
  currentTab: number;
  mintTarget: number | null;
  txState: TransactionStatus;
  cost: string | number;
};

function PaginatedNFTsComponent({
  itemsPerPage,
  currentTab,
  sendMintTX,
  sendSudoMintTX,
  isNFTMinted,
  mintTarget,
  cost,
  txState,
}: PaginatedNFTs) {
  const [currentItems, setCurrentItems] = useState<null | NFTMetaData[]>(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageDisplay, setCurrentPageDisplay] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchText, setSearchText] = useState<null | string>(null);
  const [searchResults, setSearchResults] = useState<null | NFTMetaData[]>(
    null
  );

  const nftCollection = [metadataLight, metadataDark];

  useEffect(() => {
    setCurrentPageDisplay(currentPage + 1);
  }, [currentPage]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    if (searchResults?.length) {
      setCurrentItems(searchResults.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(searchResults.length / itemsPerPage));
    } else {
      setCurrentItems(nftCollection[currentTab].slice(itemOffset, endOffset));
      setPageCount(Math.ceil(nftCollection[currentTab].length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, searchResults?.length]);

  function search() {
    if (searchText === "" || searchText === null) {
      setSearchResults(nftCollection[currentTab]);
      pushWindowHash(0);
      const newOffset = calcNewOffset(0, nftCollection[currentTab]);
      setItemOffset(newOffset);
      return;
    }

    const searchResult = nftCollection[currentTab].filter(({ attrString }) => {
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
      newOffset = calcNewOffset(event.selected, metadataLight);
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
              Page — {currentPageDisplay} / {pageCount}
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
        sendSudoMintTX={sendSudoMintTX}
        isNFTMinted={isNFTMinted}
        cost={cost}
        currentItems={currentItems}
        mintTarget={mintTarget}
        currentTab={currentTab}
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

export const PaginatedNFTs = React.memo(PaginatedNFTsComponent);
