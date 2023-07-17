// Copyright (C) 2022-2023 PMR Fansub
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { useAuth } from "../utils/auth";
import { useState } from "react";

const Profile = () => {
  const auth = useAuth();

  return (
    <Flex
      align={{ base: "center", md: "start" }}
      flexDir={{ base: "column", md: "row" }}
      justify={{ base: "flex-start", md: "flex-start" }}
      minHeight={"85vh"}
      py={10}
      width={"100vw"}
    >
      <VStack width={{ base: "50%", md: "30%" }} paddingBottom={{ base: 5 }}>
        <Avatar size="2xl" name={auth.userInfo.username} />
        <Text fontSize="4xl">{auth.userInfo.nickname}</Text>
        <Text fontSize="2xl" color={"gray.500"}>
          {auth.userInfo.username}
        </Text>
      </VStack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        width={{ base: "90%", md: "60%" }}
        p={8}
      >
        <Heading size={"md"} color={"gray.500"}>
          个人资料
        </Heading>
        <Divider my={4} />
        <VStack align={"start"} spacing={6}>
          <ProfileItem label="SFID" value={auth.userInfo.id} />
          <ProfileItem label="用户名" value={auth.userInfo.username} />
          <ProfileItem
            label="昵称"
            value={
              <HStack spacing={4}>
                <Text fontSize={"md"}>{auth.userInfo.nickname}</Text>
                <EditNicknameButton />
              </HStack>
            }
          />
          <ProfileItem label="邮件地址" value={auth.userInfo.email} />
          <ProfileItem
            label="注册时间"
            value={new Date(auth.userInfo.register_time).toLocaleString()}
          />
          <ProfileItem
            label="最后登录时间"
            value={new Date(auth.userInfo.login_time).toLocaleString()}
          />
        </VStack>
      </Box>
    </Flex>
  );
};

export default Profile;

interface ProfileItemProps {
  label: string;
  value: number | string | React.ReactNode;
}

const ProfileItem = ({ label, value }: ProfileItemProps) => {
  const isElement = typeof value === "object";

  return (
    <Stack key={label} spacing={4} direction={{ base: "column", sm: "row" }}>
      <Text width={"28"} fontSize={"md"} color={"gray.400"}>
        {label}
      </Text>
      {!isElement ? <Text fontSize={"md"}>{value}</Text> : <>{value}</>}
    </Stack>
  );
};

const EditNicknameButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = useAuth();

  const [input, setInput] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const onCancel = () => {
    setInput("");
    onClose();
  };

  const onConfirm = () => {
    auth.updateUserInfo(input);
    setInput("");
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Edit"
        icon={<EditIcon />}
        size="xs"
        onClick={onOpen}
      />
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>修改昵称</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="nickname">新昵称</FormLabel>
              <Input
                id="nickname"
                isRequired
                onChange={handleInputChange}
                value={input}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant={"ghost"} onClick={onCancel} mr={3}>
              取消
            </Button>
            <Button colorScheme={"blue"} onClick={onConfirm}>
              修改
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
