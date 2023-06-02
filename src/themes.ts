import { createTheme } from "@mui/material" // mui

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      light: "#717171",
    },
    secondary: {
      main: "#030303",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 600,
      lg: 976,
      xl: 1440,
    },
  },
}) // light theme
export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#212121",
      light: "#949494",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 600,
      lg: 976,
      xl: 1440,
    },
  },
}) // dark theme
