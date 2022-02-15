import { NFTMetaData } from "../global";

function sortABC(a: NFTMetaData, b: NFTMetaData) {
  if (a.attrString < b.attrString) {
    return -1;
  }
  if (a.attrString > b.attrString) {
    return 1;
  }
  return 0;
}

function combineAttr(data: Omit<NFTMetaData, "attrString">) {
  const attrString = [data.attributes[1].value, data.attributes[2].value].join(
    ""
  );

  return { ...data, attrString };
}

function isNumber(item: any) {
  return Number.isInteger(Number(item));
}

function sortLeadingNumberLast(collection: NFTMetaData[]) {
  const leaderNumberItems: NFTMetaData[] = [];
  const alphaLeadingItems: NFTMetaData[] = [];

  collection.forEach((item: NFTMetaData) => {
    const LeftTrait = item.attributes.find(
      (attr) => attr.trait_type === "Left"
    );

    if (LeftTrait && isNumber(LeftTrait.value)) {
      leaderNumberItems.push(item);
    } else {
      alphaLeadingItems.push(item);
    }
  });

  return [...alphaLeadingItems, ...leaderNumberItems];
}

export function MetaDataCleaner(_metadata: Omit<NFTMetaData, "attrString">[]) {
  const metadataSorted: NFTMetaData[] = _metadata
    .map(combineAttr)
    .sort(sortABC);

  const sortedAlphaFirst = sortLeadingNumberLast(metadataSorted);
  return sortedAlphaFirst;
}
