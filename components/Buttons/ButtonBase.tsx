import { css } from "@mui/material";
import { theme } from "../../config/theme";

export const ButtonBase = css`
  width: 100%;
  box-shadow: none;
  border-radius: 50px;

  line-height: 0;

  /* min-height: 47px; */
  font-weight: 700;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  text-decoration: none;
  text-transform: uppercase;
  &:hover,
  &:active,
  &:focus {
    box-shadow: none;
  }

  padding: 25px 0px;

  ${theme.breakpoints.up("sm")} {
    padding: 25px 0px;
  }

  ${theme.breakpoints.up("md")} {
    padding: 26px 0px;
  }

  ${theme.breakpoints.up("lg")} {
    padding: 26px 0px;
  }

  ${theme.breakpoints.up("xl")} {
    padding: 30px 0px;
  }
`;
