import { createTheme } from "@mui/material/styles";
import { lightPalette } from "./palette";
import { typography } from "./typography";
import { components } from "./components";

const theme = createTheme({
  typography,
  components,
  palette: lightPalette,
  shape: {
    borderRadius: 8,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  spacing: 8,
});

export default theme;
