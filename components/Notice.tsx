import { Fragment } from "react";
import { Button } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export const Notice = function({ handleClose }: { handleClose: () => void }) {
  return (
    <Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        {/* <CloseIcon fontSize="small" /> */}
        Fuck
      </IconButton>
    </Fragment>
  );
};
