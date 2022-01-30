import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { NFTList } from "./NFTList";
import { metadata } from "../utils/metadata";
import { TransactionStatus } from "@usedapp/core";
import { SearchField } from "./SearchField";
import { Button } from "@mui/material";

type PaginatedNFTs = {
  sendMintTX: (id: number) => void;
  isNFTMinted: (id: number) => boolean;
  itemsPerPage: number;
  mintTarget: number | null;
  txState: TransactionStatus;
  cost: string | number;
};

export function PaginatedNFTs({
  itemsPerPage,
  sendMintTX,
  isNFTMinted,
  mintTarget,
  cost,
  txState,
}: PaginatedNFTs) {
  const [currentItems, setCurrentItems] = useState<null | NFTMetaData[]>(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchText, setSearchText] = useState<null | string>(null);
  const [searchResults, setSearchResults] = useState<null | NFTMetaData[]>(
    null
  );

  useEffect(() => {
    // const itemsToPaginate = searchResults
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(metadata.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(metadata.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  function search() {
    if (searchText === "" || searchText === null) {
      console.log(currentItems);
      return;
    }

    const searchResult = metadata.filter(({ attrString }) => {
      return attrString.toLowerCase().includes(searchText.toLowerCase());
    });

    setSearchResults(searchResult);
    console.log(searchResult);
  }

  function handlePageClick(event: any, scrollToTop: boolean = false) {
    const newOffset = (event.selected * itemsPerPage) % metadata.length;
    setItemOffset(newOffset);
    pushWindowHash(`#${event.selected}`);

    if (scrollToTop) {
      doScrollToTop();
    }
  }

  function pushWindowHash(num: string): void {
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
                display: "flex",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              Page 1 / 10
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: "flex" }}>
              <SearchField
                onChange={(e) => handleSearchChange(e.target.value)}
                id="outlined-basic"
                placeholder="Search.."
                InputLabelProps={{ shrink: false }}
                hiddenLabel
                variant="outlined"
              />
              <Button onClick={search} sx={{ px: "30px" }} variant="contained">
                Search
              </Button>
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
