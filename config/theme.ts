import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    success: {
      light: "hsl(255deg 97% 62%)",
      main: "hsl(255deg 97% 58%)",
      dark: "hsl(255deg 97% 45%)",
    },
    error: {
      main: "#FC542B",
      dark: "#DC3309",
    },
    primary: {
      main: "#FC542B",
      dark: "#DC3309",
    },
    secondary: {
      light: "hsl(255deg 46% 40%)",
      main: "hsl(255deg 46% 60%)",
      dark: "hsl(255deg 46% 50%)",
    },
  },
});
