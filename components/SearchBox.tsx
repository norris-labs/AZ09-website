import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/system";
import { memo } from "react";
import { SearchField } from "./SearchField";

const SearchButtonComponent = styled(Button)`
  background: #444444;
`;

export const SearchButton = memo(SearchButtonComponent);

type SearchBoxProps = {
  onChange: (searchText: string) => void;
};

function SearchBoxComponent({ onChange }: SearchBoxProps) {
  return (
    <>
      <SearchField
        id="outlined-basic"
        placeholder="Search.."
        InputLabelProps={{ shrink: false }}
        hiddenLabel
        variant="outlined"
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        inputProps={{
          maxLength: 2,
        }}
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
    </>
  );
}

export const SearchBox = memo(SearchBoxComponent);
