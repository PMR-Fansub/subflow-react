// Copyright (C) 2022-2023 PMR Fansub
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Image
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import TeamCollaborationIllustration from "../assets/teamCollaboration.svg";
import { useAuth } from "../utils/auth";

const Landing = () => {
  const navigate = useNavigate();
  const auth = useAuth()!;

  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          让字幕工作{" "}
          <Text as={"span"} color={"brand.light"}>
            更高效
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          SubFlow 是一个开源的字幕组工作流管理平台，让字幕工作更轻松、更高效。
          <br />
          自动流程跟踪，任务指派与认领系统，从此告别杂乱无章、无人维护的在线表格。
        </Text>
        <Stack spacing={6} direction={"row"}>
          {auth.userInfo ? (
            <Button
              rounded={"full"}
              px={6}
              colorScheme={"blue"}
              bg={"brand.light"}
              _hover={{ bg: "brand.dark" }}
              onClick={() => navigate("/kanban")}
            >
              SubFlow Go!
              <ArrowForwardIcon ml={2} />
            </Button>
          ) : (
            <>
              <Button
                rounded={"full"}
                px={6}
                colorScheme={"blue"}
                bg={"brand.light"}
                _hover={{ bg: "brand.dark" }}
                onClick={() => navigate("/register")}
              >
                注册
              </Button>
              <Button
                rounded={"full"}
                px={6}
                onClick={() => navigate("/login")}
              >
                登录
              </Button>
            </>
          )}
        </Stack>
        <Flex w={"full"} justify={"center"}>
          <Image
            src={TeamCollaborationIllustration}
            height={{ sm: "24rem", lg: "28rem" }}
            mt={{ base: 12, sm: 16 }}
          />
        </Flex>
      </Stack>
    </Container>
  );
};

export default Landing;
