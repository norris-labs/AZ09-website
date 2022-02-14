import MuiAlert, { AlertProps } from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import { forwardRef } from "react";
import { memo } from "react";

export type AlertTypes = "error" | "warning" | "info" | "success";

export type AlertState = {
  type: AlertTypes;
  message: string;
  showLoader: boolean;
};

type AlertComponentProps = {
  alertState: AlertState | null;
  setAlertState: (state: AlertState | null) => void;
};

function AlertComponent({ alertState, setAlertState }: AlertComponentProps) {
  return (
    <Snackbar
      open={Boolean(alertState)}
      autoHideDuration={6000}
      message={"toastMessage"}
      TransitionProps={{
        appear: false,
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <AlertBody icon={false} severity={alertState?.type as AlertTypes}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            width: "100%",
            fontSize: "1.1rem",
          }}
        >
          {alertState?.showLoader && (
            <CircularProgress color="inherit" thickness={5} size={20} />
          )}
          <Box
            sx={{
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            {alertState?.message}
          </Box>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setAlertState(null)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </AlertBody>
    </Snackbar>
  );
}

const AlertBody = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Alert = memo(AlertComponent);
