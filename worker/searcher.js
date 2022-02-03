function searchResults(searchText, collection) {
  if (searchText === "" || searchText === null) {
    return [];
  }
  return collection.filter(({ attrString }) => {
    return attrString.toLowerCase().includes(searchText.toLowerCase());
  });
}

addEventListener("message", (event) => {
  const { searchText, collection } = event.data;
  const _searchResults = searchResults(searchText, collection) || [];
  postMessage({ searchResults: _searchResults, searchText });
});
