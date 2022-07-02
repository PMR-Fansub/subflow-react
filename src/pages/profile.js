import { EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Flex,
  VStack,
  Text,
  Box,
  useColorModeValue,
  Heading,
  Divider,
  HStack,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from "@chakra-ui/react";
import { useAuth } from "../utils/auth";

const Profile = () => {
  const auth = useAuth();

  return (
    <Flex
      width={"100vw"}
      minHeight={"85vh"}
      justify={{ md: "flex-start" }}
      align={{ base: "center", md: "flex-start" }}
      py={10}
      flexDir={{ base: "column", md: "row" }}
    >
      <VStack width={"30%"} paddingBottom={{ base: 5 }}>
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
        width={"60%"}
        p={8}
      >
        <Heading size={"md"} color={"gray.600"}>
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
                <Text fontSize={"md"} color={"gray.500"}>
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

  const onModalOpen = () => {
    console.log("Open");
    onOpen();
  };

  const onModalClose = () => {
    console.log("Close");
    auth.getUserInfo();
    onClose();
  };

  return (
    <>
      <Button size={"xs"} onClick={onModalOpen}>
        <EditIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>修改昵称</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button variant={"ghost"} onClick={onModalClose} mr={3}>
              取消
            </Button>
            <Button colorScheme={"blue"}>修改</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Profile;
