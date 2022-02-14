import { Button } from "@mui/material";

import { styled } from "@mui/system";
import { theme } from "../../config";

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
