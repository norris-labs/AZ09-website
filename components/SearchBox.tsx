import { styled } from "@mui/system";
import { Button } from "@mui/material";
import { SearchField } from "./SearchField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const SearchButton = styled(Button)`
  background: #444444;
`;

type SearchBoxProps = {
  handleSearchChange: (searchStr: string) => void;
  search: () => void;
};

export function SearchBox({ handleSearchChange, search }: SearchBoxProps) {
  return (
    <>
      <SearchField
        onChange={(e) => handleSearchChange(e.target.value)}
        id="outlined-basic"
        placeholder="Search.."
        InputLabelProps={{ shrink: false }}
        hiddenLabel
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{
                  fontSize: "1.75rem",
                  fill: "hsla(0, 0%, 100%, 0.35)",
                }}
              />
            </InputAdornment>
          ),
        }}
      />
      <SearchButton onClick={search} sx={{ px: "30px" }} variant="contained">
        Search
      </SearchButton>
    </>
  );
}
