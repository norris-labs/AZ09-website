import { Link } from "@mui/material";
import { styled } from "@mui/system";
import { ButtonBase } from "./ButtonBase";

export const LinkButton = styled(Link)`
  ${ButtonBase}
  display: flex;
  font-size: 1.1rem;
  justify-content: space-around;
  align-items: center;
  background: #8d8d8d;
  color: white;
  &:hover,
  &:active,
  &:focus {
    background: #6e6e6e;
    box-shadow: none;
  }
  .Mui-disabled {
    background: #c8c6c5;
  }
`;
