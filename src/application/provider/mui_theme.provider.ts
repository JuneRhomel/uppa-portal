
import { createTheme } from "@mui/material/styles";

// Create a custom theme
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif', 
  },
  palette: {
    primary: {
      main: '#0B0F13',
    },
    secondary: {
      main: '#526A82',
    },
    error: {
      main: '#FF4C4C',
    },
    success: {
      main: '#00E891',
      contrastText: '#fff',
    },
  },
  
});


export default theme;
