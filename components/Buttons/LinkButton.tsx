import { Link } from "@mui/material";
import { styled } from "@mui/system";
import { ButtonBase } from "./ButtonBase";
import { theme } from "../../config/theme";

export const LinkButton = styled(Link)`
  ${ButtonBase}
  display: flex;
  font-size: 1.1rem;
  justify-content: space-around;
  align-items: center;
  background: ${theme.palette.secondary.main};
  color: #fff;
  &:hover,
  &:active,
  &:focus {
    background: ${theme.palette.secondary.dark};
    box-shadow: none;
  }

  .Mui-disabled {
    background: #c8c6c5;
  }

  font-size: 0.95rem;

  ${theme.breakpoints.up("sm")} {
    font-size: 1.1rem;
  }

  ${theme.breakpoints.up("md")} {
    font-size: 1.1rem;
  }

  ${theme.breakpoints.up("lg")} {
    font-size: 1.2rem;
  }

  ${theme.breakpoints.up("xl")} {
    font-size: 1.5rem;
  }
`;
