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
      light: "hsl(203deg 17% 57%)",
      main: "hsl(203deg 17% 52%)",
      dark: "hsl(203deg 17% 47%)",
    },
  },
});
