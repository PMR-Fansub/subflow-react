// Copyright (C) 2022-2023 PMR Fansub
//
// SPDX-License-Identifier: GPL-3.0-or-later

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../utils/auth";
import { useForm } from "react-hook-form";
import SubFlowLogoFull from "../assets/subflow-full.svg";
import SubFlowLogoFullWhite from "../assets/subflow-full-white.svg";
import { AxiosError } from "axios";

const Register = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, _] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch
  } = useForm();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = (values: {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
  }) => {
    console.log(values);

    auth
      .register(values.username, values.email, values.password)
      .then(() => {
        toast({
          title: "注册成功",
          description: "即将转到登录页面…",
          status: "success",
          duration: 5000,
          isClosable: true
        });
        navigate("/login");
      })
      .catch((error: AxiosError) => {
        let errorMessage = "";
        if (error.response) {
          errorMessage = `${error.response.data.message} (${error.response.data.code})`;
        } else {
          errorMessage = error.message;
        }
        toast({
          title: "注册失败",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true
        });
      });
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Image
            src={useColorModeValue(SubFlowLogoFull, SubFlowLogoFullWhite)}
            height={"60px"}
          ></Image>
          <Text fontSize={"lg"} color={"gray.600"}>
            Make fansub workflow more{" "}
            <Text
              as={"span"}
              color={useColorModeValue("brand.light", "white")}
              fontWeight={"bold"}
            >
              efficient
            </Text>
            .
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          minWidth={"md"}
          p={8}
        >
          <form onSubmit={handleSubmit(handleRegister)}>
            <Stack spacing={4}>
              <FormControl id="username" isRequired isInvalid={errors.username}>
                <FormLabel htmlFor="username">用户名</FormLabel>
                <Input
                  id="username"
                  autoComplete="username"
                  {...register("username", {
                    required: "用户名不可为空",
                    minLength: { value: 4, message: "用户名长度不可小于4" },
                    maxLength: { value: 32, message: "用户名长度不可大于32" }
                  })}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="email" isRequired isInvalid={errors.email}>
                <FormLabel htmlFor="email">邮箱地址</FormLabel>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email", {
                    required: "邮箱地址不可为空",
                    pattern: {
                      value: emailRegex,
                      message: "邮箱地址格式不正确"
                    }
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="password" isRequired isInvalid={errors.password}>
                <FormLabel htmlFor="password">密码</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    {...register("password", {
                      required: "密码不可为空",
                      minLength: { value: 6, message: "密码长度不可小于6" },
                      maxLength: { value: 64, message: "密码长度不可大于64" }
                    })}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                id="repeatPassword"
                isRequired
                isInvalid={errors.repeatPassword}
              >
                <FormLabel htmlFor="repeatPassword">重复密码</FormLabel>
                <InputGroup>
                  <Input
                    id="repeatPassword"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    {...register("repeatPassword", {
                      validate: value =>
                        value === watch("password") || "两次密码不一致"
                    })}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.repeatPassword && errors.repeatPassword.message}
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  bg={"green.500"}
                  color={"white"}
                  _hover={{
                    bg: "green.600"
                  }}
                  type="submit"
                  isLoading={isSubmitting}
                >
                  注册
                </Button>
              </Stack>
              <Stack pt={4}>
                <Text align={"center"} color={"gray.500"}>
                  已经有帐号了？{" "}
                  <Link color={"brand.light"} as={RouterLink} to="/login">
                    登录
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
