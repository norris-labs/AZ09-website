const filter = require("lodash.filter");
const debounce = require("lodash.debounce");

function filterNFTs(searchText, collection) {
  if (searchText === "" || searchText === null) {
    return [];
  }

  return filter(collection, (item) => {
    return item.attrString.toLowerCase().includes(searchText.toLowerCase());
  });
}

const filterNFTsDebounced = debounce(filterNFTs, 4000, { leading: true });

addEventListener("message", (event) => {
  const { searchText, collection } = event.data;
  const _searchResults = filterNFTsDebounced(searchText, collection) || [];
  postMessage({ searchResults: _searchResults, searchText });
});
