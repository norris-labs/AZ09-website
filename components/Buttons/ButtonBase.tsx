import { css } from "@mui/material";

export const ButtonBase = css`
  width: 100%;
  box-shadow: none;
  border-radius: 50px;
  padding: 0;
  line-height: 0;
  font-size: 1.25rem;
  min-height: 47px;
  font-weight: 700;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  text-decoration: none;
  text-transform: uppercase;
  &:hover,
  &:active,
  &:focus {
    box-shadow: none;
  }
`;
