// Copyright (C) 2022-2023 PMR Fansub
//
// SPDX-License-Identifier: GPL-3.0-or-later

import {
  Box,
  chakra,
  Container,
  Image,
  // Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden
} from "@chakra-ui/react";
import { RiBilibiliFill, RiGithubFill } from "react-icons/ri";
import SubFlowLogoFull from "../assets/subflow-full.svg";
import SubFlowLogoFullWhite from "../assets/subflow-full-white.svg";

interface SocialButtonProps {
  children: React.ReactNode;
  label: string;
  href: string;
}

const SocialButton = ({ children, label, href }: SocialButtonProps) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      target="_blank"
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200")
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Image
          src={useColorModeValue(SubFlowLogoFull, SubFlowLogoFullWhite)}
          height="20px"
        />
        <Text>© 2022-2023 PMR Fansub. All rights reserved.</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton
            label={"Bilibili"}
            href={"https://space.bilibili.com/7151607"}
          >
            <RiBilibiliFill />
          </SocialButton>
          <SocialButton
            label={"GitHub"}
            href={"https://github.com/PMR-Fansub/"}
          >
            <RiGithubFill />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
