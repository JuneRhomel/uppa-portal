import { createTheme } from "@mui/material/styles";

// Create a custom theme
const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: "#3da9fc",
    },
    secondary: {
      main: "#00214d",
    },
    error: {
      main: "#ff5470",
    },
    success: {
      main: "#00E891",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "#fffffe", 
        },
      },
    },
  },
});

export default theme;
