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

function findStringStart(items: NFTMetaData[]) {
  for (let i = 0; i < items.length; i++) {
    // let foundLetterStart = false;
    // if (foundLetterStart === false)
    const [left, right] = items[i].attrString.split("");

    if (isNumber(left) || isNumber(right)) {
      continue;
    } else {
      // foundLetterStart = true;
      return i;
    }
  }
}

function lettersFirst(items: NFTMetaData[]) {
  console.log({ items });
  const letterStartIndex = findStringStart(items);
  const numbers = items.slice(0, letterStartIndex);
  const letters = items.slice(letterStartIndex);
  return [...letters.sort(), ...numbers.sort()];
}

export function MetaDataCleaner(_metadata: Omit<NFTMetaData, "attrString">[]) {
  const metadataSorted: NFTMetaData[] = _metadata
    .map(combineAttr)
    .sort(sortABC);
  return lettersFirst(metadataSorted);
}
