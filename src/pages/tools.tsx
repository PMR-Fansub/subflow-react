// Copyright (C) 2022-2023 PMR Fansub
//
// SPDX-License-Identifier: GPL-3.0-or-later

import {
  Card,
  CardBody,
  Flex,
  Icon,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { RiTranslate } from "react-icons/ri";
import { Link as RouterLink } from "react-router-dom";

const Tools = () => (
  <SimpleGrid
    p={{ base: 8 }}
    columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
    gap={{ base: 4 }}
  >
    {TOOL_ITEMS.map((props: ToolCardProps) => (
      <ToolCard key={props.label} {...props} />
    ))}
  </SimpleGrid>
);

export default Tools;

interface ToolCardProps {
  label: string;
  href: string;
  icon: IconType;
  description?: string;
}

const ToolCard = ({ label, href, icon, description }: ToolCardProps) => {
  return (
    <LinkBox role="group">
      <Card
        w={{ base: 48, md: 56 }}
        h={{ base: 24, md: 28 }}
        border="1px"
        borderColor={useColorModeValue("gray.200", "gray.600")}
        bgColor={useColorModeValue("gray.50", "gray.700")}
        _groupHover={{
          bgColor: useColorModeValue("blue.50", "blue.900"),
          shadow: "lg"
        }}
      >
        <CardBody>
          <Flex alignItems="start" gap={4}>
            <Icon
              color={useColorModeValue("gray.500", "gray.400")}
              as={icon}
              fontSize={{ base: "4xl", md: "5xl" }}
              _groupHover={{
                color: useColorModeValue("brand.light", "white")
              }}
            />
            <Flex flexDir="column" alignItems="start" gap={2}>
              <LinkOverlay as={RouterLink} to={href}>
                <Text
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="semibold"
                  color={useColorModeValue("gray.500", "gray.400")}
                  _groupHover={{
                    color: useColorModeValue("brand.light", "white")
                  }}
                >
                  {label}
                </Text>
              </LinkOverlay>
              {description ? (
                <Text
                  fontSize={{ base: "xs", md: "sm" }}
                  color={useColorModeValue("gray.400", "gray.500")}
                >
                  {description}
                </Text>
              ) : null}
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </LinkBox>
  );
};

const TOOL_ITEMS: ToolCardProps[] = [
  { label: "翻译速查表", href: "/tools/cheatsheet", icon: RiTranslate }
];
