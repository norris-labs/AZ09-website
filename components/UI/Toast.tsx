import MuiAlert, { AlertProps, AlertColor } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
import { memo } from "react";

type ToastComponentProps = {
  mintError?: any;
  mintLoading?: boolean;
  toastIsClosed?: boolean;
  toggleToast: (state: boolean) => void;
};

function ToastComponent({
  mintLoading,
  mintError,
  toggleToast,
  toastIsClosed,
}: ToastComponentProps) {
  return (
    <Snackbar
      open={toastIsClosed}
      autoHideDuration={6000}
      onClose={() => toggleToast(false)}
      message={"toastMessage"}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert
        severity="success"
        sx={{
          width: "100%",
          fontSize: "1.1rem",
        }}
      >
        Yoooo!
      </Alert>
    </Snackbar>
  );
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Toast = memo(ToastComponent);

// const txStateToToastMap: Record<TransactionState, AlertColor> = {
//   Success: "success",
//   PendingSignature: "info",
//   Exception: "error",
//   Fail: "error",
//   None: "info",
//   Mining: "info",
// };
