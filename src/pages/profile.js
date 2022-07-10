import { EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import { useAuth } from "../utils/auth";
import { useState } from "react";

const Profile = () => {
  const auth = useAuth();

  return (
    <Flex
      align={{ base: "center", md: "center" }}
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
          {[
            { label: "SFID", value: auth.userInfo.id },
            {
              label: "用户名",
              value: auth.userInfo.username
            },
            {
              label: "昵称",
              value: auth.userInfo.nickname,
              others: <EditNicknameButton />
            },
            { label: "邮件地址", value: auth.userInfo.email },
            {
              label: "注册时间",
              value: new Date(auth.userInfo.register_time).toLocaleString()
            },
            {
              label: "最后登录时间",
              value: new Date(auth.userInfo.login_time).toLocaleString()
            }
          ].map(item => {
            return (
              <HStack key={item.label} spacing={4}>
                <Text width={"28"} fontSize={"md"} color={"gray.400"}>
                  {item.label}
                </Text>
                <Text fontSize={"md"}>{item.value}</Text>
                {item.others}
              </HStack>
            );
          })}
        </VStack>
      </Box>
    </Flex>
  );
};

const EditNicknameButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = useAuth();

  const [input, setInput] = useState("");
  const handleInputChange = e => setInput(e.target.value);

  const onModalOpen = () => {
    console.log("Open");
    onOpen();
  };

  const onModalClose = () => {
    console.log("Close");
    auth.getUserInfo();
    setInput("");
    onClose();
  };

  const onConfirm = () => {
    console.log("Update");
    auth.updateUserInfo(input);
    setInput("");
    onClose();
  };

  return (
    <>
      <Button size={"xs"} onClick={onModalOpen}>
        <EditIcon />
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onModalClose}>
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
            <Button variant={"ghost"} onClick={onModalClose} mr={3}>
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

export default Profile;
