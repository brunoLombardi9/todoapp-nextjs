import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#100F0F",
    },
    secondary: {
      main: "#2B4865",
    },
    third: {
      main: "#E8F9FD",
    },
    delete: {
      main: "#f70000",
    },
    orange: {
      main: "#FF9F29",
    },
    success: {
      main: "#008000",
    },
  },
});

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
