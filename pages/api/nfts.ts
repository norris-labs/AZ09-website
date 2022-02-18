// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import _ from "lodash";
import type { NextApiRequest, NextApiResponse } from 'next';
import { EditionNames, EDITIONS, ITEMS_PER_PAGE } from '../../constants';
import { NFTMetaData } from "../../global";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method !== 'POST') {
    throw Error('only post')
  }

  const {
    searchTerm,
    pageNum = 0,
    edition = 'dark'
  } = req.body;

  if (!searchTerm)  {
    const pageResults = calcPageResults(EDITIONS[edition as EditionNames], pageNum)
    const pageCount = calcPageCount(EDITIONS[edition as EditionNames]);
    return res.status(200).json({
      result: pageResults,
      pageCount,
      pageNum
    })
  }

  const searchResults = filterNFTs(searchTerm, edition)
  const pageResults = calcPageResults(searchResults, pageNum)
  const pageCount = calcPageCount(searchResults);
  return res.status(200).json({
    result: pageResults,
    pageCount,
    pageNum
  })
}

function filterNFTs(searchTerm: string, edition: string) {
  if (searchTerm === "" || searchTerm === null) {
    return [];
  }

  let collectionToSearch = EDITIONS[edition as EditionNames];

  return _.filter(collectionToSearch, (item: NFTMetaData) => {
    return item.attrString.toLowerCase().includes(searchTerm.toLowerCase());
  });
}

function calcOffset(collection: NFTMetaData[], pageNum: number) {
  const offset = (pageNum * ITEMS_PER_PAGE) % collection.length;
  return offset;
}

function calcPageCount(collection: NFTMetaData[]){
  return Math.ceil(collection.length / ITEMS_PER_PAGE);
}

function calcPageResults(collection: NFTMetaData[], pageNum: number) {
  const offset = calcOffset(collection, pageNum);
  const endOffset = offset + ITEMS_PER_PAGE;
  return collection.slice(offset, endOffset);
}

type Data = {
  result: NFTMetaData[] | []
  pageNum?: number
  pageCount?: number
}

