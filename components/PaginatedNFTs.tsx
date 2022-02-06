import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TransactionStatus } from "@usedapp/core";
import React, { memo, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { NFTPage } from "./NFTPage";
import { SearchBox } from "./SearchBox";

type PaginatedNFTsProps = {
  NFTList: NFTMetaData[];
  activeMintId: number | null;
  cost: string | number;
  isNFTMinted: (id: number) => boolean;
  itemsPerPage: number;
  setActiveMintId: (id: number) => void;
  txState: TransactionStatus;
};

function doScrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function calcNewOffset(
  pageNum: number,
  itemsPerPage: number,
  itemsToPaginate: NFTMetaData[]
) {
  return (pageNum * itemsPerPage) % itemsToPaginate.length;
}

function PaginatedNFTsComponent({
  cost,
  isNFTMinted,
  itemsPerPage,
  activeMintId,
  setActiveMintId,
  txState,
  NFTList,
}: PaginatedNFTsProps) {
  const [searchResults, setSearchResults] = useState<[] | NFTMetaData[]>([]);
  const [pageResults, setPageResults] = useState<[] | NFTMetaData[]>([]);

  // ------------ number of total pages ------------ //
  const [pageCount, setPageCount] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(0);
  const [currentPageNumDisplay, setCurrentPageNumDisplay] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);

  const [searchText, setSearchText] = useState<string>("");

  const workerRef: React.MutableRefObject<Worker | undefined> = React.useRef();

  useEffect(() => {
    handlePageChange();
    setCurrentPageNumDisplay(currentPageNum + 1);
  }, [currentPageNum]);

  useEffect(() => {
    function calcPagePagination() {
      const _endOffset = itemOffset + itemsPerPage;
      const collectionsToPaginate = searchResults?.length
        ? searchResults
        : NFTList;

      setPageResults(collectionsToPaginate.slice(itemOffset, _endOffset));
      setPageCount(Math.ceil(collectionsToPaginate.length / itemsPerPage));
    }

    calcPagePagination();
  }, [itemOffset, itemsPerPage, searchResults.length]);

  useEffect(() => {
    function searchReciever() {
      if (!workerRef) return;

      workerRef.current = new Worker(
        new URL("../worker/searcher.js", import.meta.url)
      );

      workerRef.current.onmessage = (e) => {
        const { searchResults } = e.data;

        setSearchResults(searchResults);
      };
    }

    searchReciever();

    return () => {
      if (!workerRef.current) return;
      workerRef.current.terminate();
    };
  }, []);

  const searchPoster = React.useCallback((searchText) => {
    if (workerRef.current) {
      workerRef?.current.postMessage({
        searchText,
        collection: NFTList,
      });
      setCurrentPageNum(0);
    }
  }, []);

  useEffect(() => {
    searchPoster(searchText);
  }, [searchText]);

  const handlePageChange = React.useCallback(() => {
    const collectionsToPaginate = searchResults?.length
      ? searchResults
      : NFTList;

    const newOffset = calcNewOffset(
      currentPageNum,
      itemsPerPage,
      collectionsToPaginate
    );

    setItemOffset(newOffset);
    doScrollToTop();
  }, [currentPageNum]);

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
                justifyContent: "space-between",
              }}
            >
              <Box>
                Page — {currentPageNumDisplay} / {pageCount}
              </Box>
              {searchResults.length > 0 && (
                <Box
                  sx={{
                    color: "#a8a8a8",
                  }}
                >
                  {searchResults.length} search{" "}
                  {searchResults.length > 1 ? "results" : "result"}
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: "flex" }}>
              <SearchBox
                onChange={(inputStr) => {
                  setSearchText(inputStr);
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <NFTPage
        NFTCollection={searchResults.length ? searchResults : pageResults}
        activeMintId={activeMintId}
        cost={cost}
        isNFTMinted={isNFTMinted}
        setActiveMintId={setActiveMintId}
        txState={txState}
      />
      <div className="pagination-wrapper">
        <ReactPaginate
          breakLabel="..."
          nextLabel="&rarr;"
          forcePage={currentPageNum}
          onPageChange={(e) => setCurrentPageNum(e.selected)}
          pageCount={pageCount}
          previousLabel="&larr;"
          pageLinkClassName="pagination-page-link"
          className="pagination-container"
        />
      </div>
    </>
  );
}

export const PaginatedNFTs = memo(PaginatedNFTsComponent);
