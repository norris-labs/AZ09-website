import MuiAlert, { AlertProps } from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import { useEffect, forwardRef } from "react";
import { memo } from "react";

const DISPLAY_SECONDS = 5 * 1000;

type ToastComponentProps = {
  error?: Error | undefined;
  toastIsOpen?: boolean;
  openToast: (state: boolean) => void;
};

function ToastComponent({
  error,
  openToast,
  toastIsOpen,
}: ToastComponentProps) {
  return (
    <Snackbar
      open={toastIsOpen}
      autoHideDuration={6000}
      message={"toastMessage"}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert icon={false} severity="success">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            width: "100%",
            fontSize: "1.1rem",
          }}
        >
          <CircularProgress color="inherit" thickness={5} size={20} />
          <Box
            sx={{
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            Minting NFT
          </Box>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => openToast(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Alert>
    </Snackbar>
  );
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Toast = memo(ToastComponent);
