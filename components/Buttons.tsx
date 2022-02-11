import { Button, css } from '@mui/material';

import { styled } from '@mui/system';
import { theme } from '../config';

export const ButtonBase = css`
  width: 100%;
  box-shadow: none;
  border-radius: 50px;
  padding: 0;
  line-height: 0;
  font-size: 1.25rem;
  min-height: 47px;
  font-weight: 700;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  text-decoration: none;
  text-transform: uppercase;
  &:hover,
  &:active,
  &:focus {
    box-shadow: none;
  }
`;

export const GreyButton = styled(Button)`
  background: #333232;
  border: none;
  padding: 10px 15px;
  font-size: 1rem;
  color: white;
  &:hover {
    background: #555555;
  }
  &:disabled {
    background: ${theme.palette.primary.main};
    color: white;
  }
`;
