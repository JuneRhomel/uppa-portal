import { IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import LoginContainerStyle from "../style/login_container.style";
import LoginFormStyle from "../style/login_form.style";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";

export default function LoginFormComponent() {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <LoginContainerStyle>
      <LoginFormStyle>
        Login
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          onChange={handleEmailChange}
        />
        <TextField
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </LoginFormStyle>
    </LoginContainerStyle>
  );
}
