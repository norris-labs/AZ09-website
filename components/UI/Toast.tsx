// import MuiAlert, { AlertProps, AlertColor } from "@mui/material/Alert";
// import Snackbar from "@mui/material/Snackbar";
// import * as React from "react";
// import { memo } from "react";

// const txStateToToastMap: Record<TransactionState, AlertColor> = {
//   Success: "success",
//   PendingSignature: "info",
//   Exception: "error",
//   Fail: "error",
//   None: "info",
//   Mining: "info",
// };

// type ToastComponentProps = {
//   toastType?: TransactionState;
//   toastMessage?: string;
//   closeToast: () => void;
// };

// function ToastComponent({
//   toastMessage,
//   toastType,
//   closeToast,
// }: ToastComponentProps) {
//   if (toastType === "None" || !toastType) {
//     return null;
//   }

//   return (
//     <Snackbar
//       open={true}
//       autoHideDuration={6000}
//       onClose={() => closeToast()}
//       message={"toastMessage"}
//       anchorOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//     >
//       <Alert
//         onClose={() => closeToast()}
//         severity={txStateToToastMap[toastType]}
//         sx={{
//           width: "100%",
//           fontSize: "1.1rem",
//         }}
//       >
//         {toastMessage}
//       </Alert>
//     </Snackbar>
//   );
// }

// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//   props,
//   ref
// ) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// export const Toast = memo(ToastComponent);
