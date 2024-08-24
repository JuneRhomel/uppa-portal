import React, { useState } from "react";
import { Box, Flex, Heading, Text, Button, TextField, Checkbox, Link, IconButton } from '@radix-ui/themes';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import * as Form from '@radix-ui/react-form';
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../infrastructure/redux/store.redux";
import { useDispatch, useSelector } from "react-redux";
import { loginCredential } from "../../../../infrastructure/api/slice/login/login_api.slice";
import toast from "react-hot-toast";
import LoginEntity from "../../../../infrastructure/api/module/login/domain/entity/login.entity";
import { useForm } from "react-hook-form";
export default function LoginFormComponent() {
  const { register, handleSubmit,  formState: { errors } } = useForm();
  const navigate = useNavigate();
  const loginState = useSelector((state: RootState) => state.loginApi);
  const dispatch: AppDispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const renderShowPasswordIcon = () => {
    if (showPassword) {
      return <EyeOpenIcon />
    }

    return <EyeClosedIcon />
  }

  const handelLoginSubmit = async (data) => {
    const inputForm = data as LoginEntity

    const response = await dispatch(loginCredential({ loginEntity: inputForm }));
    if (response.payload === "IsLoginFailure") {
      toast.error("Login Failure");
    }

    if (response.payload === "InactiveAccountFailure") {
      toast.error("Inactive Account");
    }

    if (response.payload === "IsLockedAccountFailure") {
      toast.error("Locked Account");
    }

    if (response.payload === "UnhandledFailure") {
      toast.error("Something went wrong");
    }

    navigate("/properties");
  }


  return (
    <form onSubmit={handleSubmit(handelLoginSubmit)} >
      <Flex justify={"center"} align={"center"} width={"100lvw"} height={"100lvh"}>
        <Box width={"500px"} >
          <Box mb={"5"}>
            <Heading mb="2" size="7">Login</Heading>
            <Text size={"2"}>Hi, Welcome Back June Rhomel, 👋</Text>
          </Box>
          <Flex direction={"column"} gap={"5"} mt={"5"} mb={"5"}>
            <Button type="button" style={{ width: "100%" }} size={"3"} variant="outline">Login With Google</Button>
            <Text style={{ textAlign: "center" }} size={"1"} color="gray">or Login with Email</Text>
          </Flex>

          <Box>
            <Flex gap={"2"} direction={"column"} width={"100%"} >
              <Box>
                <Text size={"2"}> Email</Text>
                <TextField.Root  size={"3"} placeholder="E.g. 5hDQH@example.com"
                  {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                />
                {errors.email && <Text color="red" size={"1"}>{errors.email.message?.toString()}</Text>}
              </Box>

              <Box>
                <Text title="password" size={"2"} weight={"medium"}> Password</Text>
                <TextField.Root type={showPassword ? "text" : "password"} size={"3"} placeholder="Enter your password"
                  {...register("password", { required: "Password is required" })}
                >
                  <TextField.Slot pr="3" side="right">
                    <IconButton type="button" size="3" onClick={toggleShowPassword} variant="ghost">
                      {renderShowPasswordIcon()}
                    </IconButton>
                  </TextField.Slot>
                </TextField.Root>
                {errors.password && <Text color="red" size={"1"}>{errors.password.message?.toString()}</Text>}
              </Box>

              <Box>
                <Text title="accountCode" size={"2"} weight={"medium"}> Account Code</Text>
                <TextField.Root type="text" size={"3"} placeholder="E.g. uppa_admin"
                  {...register("accountCode", { required: "Account code is required" })}
                />
                {errors.accountCode && <Text color="red" size={"1"}>{errors.accountCode.message?.toString()}</Text>}
              </Box>
            </Flex>
          </Box >
          <Flex justify={"between"} align={"center"} mt={"3"}>
            <Text as="label" size="1">
              <Flex gap="2">
                <Checkbox size={"1"} defaultChecked />
                Remember me
              </Flex>
            </Text>

            <Box>
              <Link size={"1"} href="#">Forgot Password?</Link>
            </Box>
          </Flex>

          <Button type="submit" mt={"5"} loading={loginState.isLoading} style={{ width: "100%" }} size={"3"} >Login</Button>
        </Box >
      </Flex >
    </form>
  );
}
