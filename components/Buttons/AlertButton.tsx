import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { theme } from "../../config/theme";

export const AlertButton = styled(Button)`
  background: ${theme.palette.primary.main};
  border: none;
  padding: 10px 15px;
  font-size: 1rem;
  color: white;
  &:hover {
    background: ${theme.palette.primary.dark};
  }
  .Mui-disabled {
    background: #c8c6c5;
  }
`;
