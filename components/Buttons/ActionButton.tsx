import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { ButtonBase } from "./ButtonBase";
import { theme } from "../../config/theme";
export const ActionButton = styled(Button)`
  ${ButtonBase}

  .Mui-disabled {
    background: #c8c6c5;
  }

  font-size: 1.25rem;

  ${theme.breakpoints.up("sm")} {
    font-size: 1.3rem;
  }

  ${theme.breakpoints.up("md")} {
    font-size: 1.55rem;
  }

  ${theme.breakpoints.up("lg")} {
    font-size: 1.45rem;
  }

  ${theme.breakpoints.up("xl")} {
    font-size: 1.75rem;
  }
`;
