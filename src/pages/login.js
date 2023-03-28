// Copyright (C) 2022-2023 PMR Fansub
//
// SPDX-License-Identifier: GPL-3.0-or-later

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Text,
  useColorModeValue,
  useToast,
  FormErrorMessage,
  Image
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import SubFlowLogoFull from "../assets/subflow-full.svg";
import SubFlowLogoFullWhite from "../assets/subflow-full-white.svg";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  let from = location.state?.from.pathname || "/";
  let [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm();

  const handleLogin = values => {
    setIsSubmitting(true);
    const username = values.username;
    const password = values.password;
    auth
      .login(username, password)
      .then(() => {
        toast({
          title: "登录成功",
          status: "success",
          duration: 5000,
          isClosable: true
        });
        navigate(from);
      })
      .catch(error => {
        let errorMessage = "";
        if (error.response) {
          errorMessage = `${error.response.data.message} (${error.response.data.code})`;
        } else {
          errorMessage = error.message;
        }
        toast({
          title: "登录失败",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true
        });
      })
      .finally(() => {
        setIsSubmitting(false);
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
          minW={"md"}
          p={8}
        >
          <form onSubmit={handleSubmit(handleLogin)}>
            <Stack spacing={4}>
              <FormControl id="username" isInvalid={errors.username}>
                <FormLabel htmlFor="username">用户名</FormLabel>
                <Input
                  id="username"
                  autoComplete="username"
                  {...register("username", { required: "用户名不可为空" })}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={errors.password}>
                <FormLabel htmlFor="password">密码</FormLabel>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password", { required: "密码不可为空" })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Link color={"brand.light"}>忘记密码？</Link>
                  <Link color={"brand.light"} as={RouterLink} to="/register">
                    注册
                  </Link>
                </Stack>
                <Button
                  bg={"brand.light"}
                  color={"white"}
                  _hover={{
                    bg: "brand.dark"
                  }}
                  type="submit"
                  isLoading={isSubmitting}
                >
                  登录
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
