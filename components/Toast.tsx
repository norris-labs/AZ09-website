import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { TransactionState } from "@usedapp/core";
import * as React from "react";
import { memo } from "react";

export enum ToastLevels {
  Exception = "error",
  Success = "success",
}

export type ToastState = {
  msg: string;
  level: TransactionState;
};

type ToastProps = {
  toastState: ToastState;
  setToastState: (state: ToastState) => void;
};

function ToastComponent({ toastState, setToastState }: ToastProps) {
  if (!toastState) return null;
  if ("msg" in toastState) return null;
  if ("level" in toastState) return null;
  // const [toastOpen, setToastOpen] = useState(false);
  //@ts-ignore
  // const alertType: AlertProps = toastLeves[noticeType];

  // React.useEffect(() => {
  //   //@ts-ignore
  //   setToastOpen(true);
  //   // if (messageMap[message]) {
  //   // }
  // }, [message]);

  // function closeToast() {
  //   setToastOpen(false);
  // }

  return (
    <Snackbar
      open={toastState.msg} //toastState
      autoHideDuration={6000}
      onClose={() => setToastState(null)}
      message={"toastMessage"}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {/* toastState.level */}
      <Alert
        onClose={() => setToastState(null)}
        //@ts-ignore
        severity={toastState.level}
        sx={{
          width: "100%",
          fontSize: "1.1rem",
        }}
      >
        {/* {mintTxState.status} */}
        {JSON.stringify(toastState)}
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

// const messageMap = {
//   "insufficient balance for transfer": true,
//   None: false,
//   "Connect wallet first before minting": true,
// };
