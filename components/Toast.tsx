import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
import { useState } from "react";

const noticeTypeMap = {
  Exception: "error",
  Success: "success",
};

const messageMap = {
  "insufficient balance for transfer": true,
  None: false,
};

type ToastProps = {
  noticeType: string;
  message: string;
};

export function Toast({ message, noticeType }: ToastProps) {
  const [toastOpen, setToastOpen] = useState(false);
  //@ts-ignore
  const alertType: AlertProps = noticeTypeMap[noticeType];

  React.useEffect(() => {
    //@ts-ignore
    if (messageMap[message]) {
      setToastOpen(true);
    }
  }, [message]);

  function closeToast() {
    setToastOpen(false);
  }

  return (
    <Snackbar
      open={toastOpen}
      autoHideDuration={6000}
      onClose={() => {}}
      message={"toastMessage"}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      action={<>HIIII</>}
    >
      <Alert
        onClose={closeToast}
        //@ts-ignore
        severity={alertType}
        sx={{
          width: "100%",
        }}
      >
        {message}
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
