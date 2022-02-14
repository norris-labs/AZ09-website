import * as React from "react";
import { LoadingButton as MuiLoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";
import { ButtonBase } from "./ButtonBase";

const CustomLoadingButton = styled(MuiLoadingButton)`
  ${ButtonBase}
  &:disabled {
    background: #d6d5d5;
  }
  font-size: 1.4rem !important;
  &:hover,
  &:active,
  &:focus {
    box-shadow: none;
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
