import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { ButtonBase } from "../Buttons";

export const ActionButton = styled(Button)`
  ${ButtonBase}
  .Mui-disabled {
    background: #c8c6c5;
  }
`;
