import { Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { SearchField } from './SearchField';
import SearchIcon from '@mui/icons-material/Search';
import { memo } from 'react';
import { styled } from '@mui/system';

const SearchButtonComponent = styled(Button)`
  background: #444444;
`;

export const SearchButton = memo(SearchButtonComponent);

type SearchBoxProps = {
  search: (e: any) => void;
};

function SearchBoxComponent({ handleSearchChange, search }: SearchBoxProps) {
  return (
    <>
      <SearchField
        id='outlined-basic'
        placeholder='Search..'
        InputLabelProps={{ shrink: false }}
        hiddenLabel
        variant='outlined'
        onChange={search}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon
                sx={{
                  fontSize: '1.75rem',
                  fill: 'hsla(0, 0%, 100%, 0.35)',
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
