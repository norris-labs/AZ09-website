import * as React from "react";
import { LoadingButton as MuiLoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";
import { ButtonBase } from "../Buttons";

const CustomLoadingButton = styled(MuiLoadingButton)`
  ${ButtonBase}
  font-size: 1.4rem !important;
  &:hover,
  &:active,
  &:focus {
    box-shadow: none;
  }

  .Mui-disabled {
    background: #c8c6c5;
  }
`;

export function LoadingButton() {
  return (
    <CustomLoadingButton
      loading
      variant="contained"
      loadingIndicator={
        <CircularProgress sx={{ color: "black", fill: "black" }} size={23} />
      }
      disabled={false}
    >
      Waiting for signature
    </CustomLoadingButton>
  );
}
