import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TransactionStatus } from "@usedapp/core";
import useBreakpoint from "use-breakpoint";
import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { API_URL, BREAKPOINTS } from "../../constants";
import { NFTList } from "./NFTList";
import { SearchBox } from "../UI/SearchBox";

type PaginatedNFTsProps = {
  activeMintId: number | null;
  cost: string | undefined;
  isNFTMinted: (id: number) => boolean;
  editionName: string;
  setActiveMintId: (id: number) => void;
  txState?: TransactionStatus;
};

const breakpointMap = {
  mobile: 1,
  tablet: 2,
  desktop: 4,
};

function scrollUp(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function PaginatedNFTsComponent({
  cost,
  isNFTMinted,
  activeMintId,
  setActiveMintId,
  txState,
  editionName,
}: PaginatedNFTsProps) {
  const [pageResults, setPageResults] = useState<[] | NFTMetaData[]>([]);
  const [runningSearch, setRunningSearch] = useState(false);

  // ------------ number of total pages ------------ //
  const [pageCount, setPageCount] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [pageNumDisplay, setPageNumDisplay] = useState(1);
  const [searchTerm, setsearchTerm] = useState<string>("");

  const { breakpoint } = useBreakpoint(BREAKPOINTS, "desktop");

  useEffect(() => {
    const body = {
      edition: editionName,
    };
    axios.post(API_URL, body).then(({ data }) => {
      setPageResults(data.result);
      setPageCount(data.pageCount);
      setPageNum(data.pageNum);
    });
  }, []);

  useEffect(() => {
    setPageNumDisplay(pageNum + 1);
  }, [pageNum]);

  const searchPoster = React.useCallback((searchTerm) => {
    setRunningSearch(true);
    const body = { edition: editionName, searchTerm };

    axios.post(API_URL, body).then(({ data }) => {
      setPageResults(data.result);
      setPageCount(data.pageCount);
      setRunningSearch(false);
      setPageNum(0);
    });
  }, []);

  useEffect(() => {
    searchPoster(searchTerm);
  }, [searchTerm]);

  const handlePageChange = React.useCallback(
    (pageNum: number) => {
      setRunningSearch(true);
      const body = { edition: editionName, searchTerm, pageNum };

      axios.post(API_URL, body).then(({ data }) => {
        setPageResults(data.result);
        setPageCount(data.pageCount);
        setRunningSearch(false);
        setPageNum(data.pageNum);
        scrollUp();
      });
    },
    [searchTerm]
  );

  return (
    <>
      <Box
        sx={{
          py: 4,
          display: "flex",
          justifyContent: "space-between",
          "@media (max-width: 599.95px)": {
            pt: 1,
            pb: 4,
          },
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                height: "100%",
                fontSize: "1.25rem",
                padding: "15px",
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "space-between",
                "@media (max-width: 599.95px)": {
                  pb: 3,
                },
              }}
            >
              <Box>
                Page — {pageNumDisplay} / {pageCount} <br />
                cost : {cost}
                {/* <br />
                loading: {JSON.stringify(loading)}
                <br />
                error: {JSON.stringify(error)}
                <br /> */}
              </Box>
              {searchTerm && (
                <Box
                  sx={{
                    color: "#a8a8a8",
                  }}
                >
                  {pageResults.length} search{" "}
                  {pageResults.length > 1 ? "results" : "result"}
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex" }}>
              <SearchBox
                onChange={(inputStr) => {
                  setsearchTerm(inputStr);
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {runningSearch ? (
        <Box
          sx={{
            paddingTop: "150px",
            minHeight: "1000px",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "1.5rem",
          }}
        >
          Loading...
        </Box>
      ) : (
        <>
          <NFTList
            NFTCollection={pageResults}
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
              forcePage={pageNum}
              onPageChange={(e) => handlePageChange(e.selected)}
              pageCount={pageCount}
              previousLabel="&larr;"
              pageRangeDisplayed={breakpointMap[breakpoint]}
              marginPagesDisplayed={breakpointMap[breakpoint]}
              pageLinkClassName="pagination-page-link"
              className="pagination-container"
            />
          </div>
        </>
      )}
    </>
  );
}

export const PaginatedNFTs = memo(PaginatedNFTsComponent);
