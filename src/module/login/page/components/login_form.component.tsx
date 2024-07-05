import {  IconButton, InputAdornment, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import LoginContainerStyle from "../style/login_container.style";
import LoginFormStyle from "../style/login_form.style";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import LoginInputContainerStyle from "../style/login_input_container.style";
import LoginHeaderStyle from "../style/login_header.style";
import LoginUseCase from "../../domain/use_case/login.use_case";
import { plainToInstance } from "class-transformer";
import LoginEntity from "../../domain/entity/login.entity";
import ButtonComponent from "../../../../components/button/button.component";

export default function LoginFormComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accountCode, setAccountCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handelFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    
    const loginEntity = plainToInstance(LoginEntity, {
      accountCode,
      email,
      password
    })

    const response = await LoginUseCase({
      loginEntity
    })

    console.log(response)
    // if (response instanceof LoginFailure) {
    //   alert("Login Failure")
    // }
    // if (response instanceof UnhandledFailure) {
    //   alert("Unhandled Failure")
    // }
    setIsLoading(false);
    navigate("/");
  };
  const handelPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleAccountCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountCode(event.target.value);
  };

  return (
    <LoginContainerStyle>
      <LoginFormStyle onSubmit={handelFormSubmit} >
        <LoginHeaderStyle>
          Login
        </LoginHeaderStyle>

        <LoginInputContainerStyle>
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            onChange={handleEmailChange}
          />

          <TextField
            fullWidth
            id="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            variant="outlined"
            InputProps={{
              endAdornment: (
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
              ),
            }}
            onChange={handelPasswordChange}
          />
          <TextField
            fullWidth
            id="accountCode"
            label="Account Code"
            variant="outlined"
            onChange={handleAccountCodeChange}
          />
          <ButtonComponent size="large" variant="contained" type="submit" isLoading={isLoading}> Login</ButtonComponent>
        </LoginInputContainerStyle>
      </LoginFormStyle>
    </LoginContainerStyle>
  );
}
