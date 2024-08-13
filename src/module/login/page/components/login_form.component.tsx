import React, { useState } from "react";
import { Box, Flex, Heading, Text, Button, TextField, Checkbox, Link, IconButton } from '@radix-ui/themes';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import * as Form from '@radix-ui/react-form';
import LoginUseCase from "../../domain/use_case/login.use_case";
import LoginEntity from "../../domain/entity/login.entity";
import LoginFailure from "../../domain/failure/login.failure";
import Failure from "../../../../application/failure/failure";
import { useNavigate } from "react-router-dom";
export default function LoginFormComponent() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
    accountCode: ""
  } as LoginEntity)
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const renderShowPasswordIcon = () => {
    if (showPassword) {
      return <EyeOpenIcon />
    }

    return <EyeClosedIcon />
  }

  function handelLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    event.preventDefault();
    const response = LoginUseCase({ loginEntity: inputForm });

    if (response instanceof LoginFailure) {
      console.log("login failure");
      setIsLoading(false);
    }

    if (response instanceof Failure) {
      console.log("login failure");
      setIsLoading(false);
    }

    setIsLoading(false);
    navigate("/properties");
  }


  const handelInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputForm({ ...inputForm, [name]: value });
  }


  return (
    <Form.Root onSubmit={handelLoginSubmit}>
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
                <Form.Field className="FormField" name="email">
                  <Form.Label >Email</Form.Label>


                  <Form.Control asChild>
                    <TextField.Root type="email" onChange={handelInputChange} size={"3"} name="email" placeholder="E.g. 5hDQH@example.com" required />
                  </Form.Control>

                  <Form.Message style={{ color: "red", fontSize: "10px" }} match="valueMissing">
                    Please enter your email
                  </Form.Message>

                  <Form.Message style={{ color: "red", fontSize: "10px" }} match="typeMismatch">
                    Please provide a valid email
                  </Form.Message>
                </Form.Field>
              </Box>

              <Box>
                <Form.Field className="FormField" name="password">


                  <Text title="password" size={"2"} weight={"medium"}> Password</Text>

                  <Form.Control asChild>
                    <TextField.Root required onChange={handelInputChange} type={showPassword ? "text" : "password"} size={"3"} name="password" placeholder="Enter your password" >
                      <TextField.Slot pr="3" side="right">
                        <IconButton type="button" size="3" onClick={toggleShowPassword} variant="ghost">
                          {renderShowPasswordIcon()}
                        </IconButton>
                      </TextField.Slot>
                    </TextField.Root>
                  </Form.Control>

                  <Form.Message style={{ color: "red", fontSize: "10px" }} match="valueMissing">
                    Please enter your password
                  </Form.Message>
                </Form.Field>
              </Box>

              <Box>
                <Form.Field name="accountCode">

                  <Text title="accountCode" size={"2"} weight={"medium"}> Account Code</Text>

                  <Form.Control asChild>
                    <TextField.Root required type="text" onChange={handelInputChange} size={"3"} name="accountCode" placeholder="E.g. uppa_admin" />
                  </Form.Control>

                  <Form.Message style={{ color: "red", fontSize: "10px" }} match="valueMissing">
                    Please enter your account code
                  </Form.Message>
                </Form.Field>
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

          <Button type="submit" mt={"5"} loading={false} style={{ width: "100%" }} size={"3"} >Login</Button>
        </Box >
      </Flex >
    </Form.Root>
  );
}
