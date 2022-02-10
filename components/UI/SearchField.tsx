import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const SearchField = styled(TextField)({
  background: "rgba(255, 255, 255, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.445)",
  borderRadius: "50px",
  width: "100%",
  input: {
    color: "white",
    "&::placeholder": {
      color: "white",
    },
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});
