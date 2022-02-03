import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TransactionStatus } from "@usedapp/core";
import React, { memo, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { metadata as metadataDark } from "../utils/metadata_dark";
import { metadata as metadataLight } from "../utils/metadata_light";
import { NFTList } from "./NFTList";
import { SearchBox } from "./SearchBox";

type PaginatedNFTsProps = {
  cost: string | number;
  currentEdition: string;
  currentTab: number;
  isNFTMinted: (id: number) => boolean;
  itemsPerPage: number;
  activeMintId: number | null;
  setActiveMintId: (id: number) => void;
  sendSudoMintTX: (id: number) => void;
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
  currentEdition,
  currentTab,
  isNFTMinted,
  itemsPerPage,
  activeMintId,
  setActiveMintId,
  sendSudoMintTX,
  txState,
}: PaginatedNFTsProps) {
  // ------------ both editions, are the collection ------------ //
  const NFT_COLLECTIONS = [metadataLight, metadataDark];
  // ------------ items in either editionsto display ------------ //
  const [NFTItems, setNFTItems] = useState<null | NFTMetaData[]>(null);
  // ------------ current editionin tab ------------ //
  // const [currentEdition, setCurrentEdition] = useState(NFT_COLLECTIONS[0]);
  // ------------ number of total pages ------------ //
  const [pageCount, setPageCount] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(0);
  const [currentPageNumDisplay, setCurrentPageNumDisplay] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);

  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<[] | NFTMetaData[]>([]);

  const workerRef: React.MutableRefObject<Worker | undefined> = React.useRef();

  useEffect(() => {
    setCurrentPageNumDisplay(currentPageNum + 1);
  }, [currentPageNum]);

  useEffect(() => {
    handlePageChange();
  }, [currentPageNum]);

  useEffect(() => {
    const _endOffset = itemOffset + itemsPerPage;
    const pageResults = searchResults?.length
      ? searchResults.slice(itemOffset, _endOffset)
      : NFT_COLLECTIONS[currentTab].slice(itemOffset, _endOffset);

    const _pageCount = Math.ceil(pageResults.length / itemsPerPage);

    setNFTItems(pageResults);
    setPageCount(_pageCount);
  }, [itemOffset, itemsPerPage, searchText]); // searchText

  useEffect(() => {
    if (!workerRef) return;

    workerRef.current = new Worker(
      new URL("../worker/searcher.js", import.meta.url)
    );

    workerRef.current.onmessage = (e) => {
      const { searchResults, searchText } = e.data;
      console.log({ searchText });
      console.log({ searchResults });

      setSearchResults(searchResults);
    };

    return () => {
      if (!workerRef.current) return;
      workerRef.current.terminate();
    };
  }, []);

  const postToSearcher = React.useCallback(async () => {
    if (workerRef.current && searchText.length) {
      workerRef?.current.postMessage({
        searchText,
        collection: NFTItems,
      });
    }
  }, [searchText]);

  useEffect(() => {
    postToSearcher();
  }, [searchText]);

  const handlePageChange = React.useCallback(() => {
    let newOffset;
    let collectionsToPaginate = searchResults?.length
      ? searchResults
      : metadataLight;

    newOffset = calcNewOffset(
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
              {searchResults.length && (
                <Box
                  sx={{
                    fontColor: "#eee",
                  }}
                >
                  Search Results: {searchResults.length}
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
      <NFTList
        NFTItems={searchResults.length ? searchResults : NFTItems}
        activeMintId={activeMintId}
        cost={cost}
        currentEdition={currentEdition}
        currentTab={currentTab}
        isNFTMinted={isNFTMinted}
        sendSudoMintTX={sendSudoMintTX}
        setActiveMintId={setActiveMintId}
        txState={txState}
      />
      <div className="pagination-wrapper">
        <ReactPaginate
          breakLabel="..."
          nextLabel="&rarr;"
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
