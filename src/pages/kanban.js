import { Flex, SimpleGrid, Spinner, useToast, VStack } from "@chakra-ui/react";
import {
  AiOutlineCalendar,
  AiOutlineFileDone,
  AiOutlineThunderbolt
} from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "../config/axios";
import {
  getDataFromResponse,
  getErrorMessageFromError
} from "../utils/request-helper";
import TaskCard from "../components/task-card";
import StatsCard from "../components/common/stats-card";

const Kanban = () => {
  const [tasksData, setTasksData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setIsLoaded(false);
    axios
      .get("/task/all")
      .then(response => {
        setTasksData(getDataFromResponse(response));
      })
      .catch(error => {
        let errorMessage = getErrorMessageFromError(error);
        toast({
          title: "任务列表加载失败",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true
        });
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

  return (
    <Flex
      align={{ base: "start", md: "center" }}
      flexDir={{ base: "column", md: "column" }}
      minHeight={"85vh"}
      py={10}
      px={10}
      width={"100vw"}
    >
      <SimpleGrid
        columns={{ base: 1, xl: 3 }}
        spacing={{ base: 5, xl: 8 }}
        width={{ base: "100%", md: "70%" }}
        mb={10}
      >
        <StatsCard
          title={"已完成"}
          stat={"249"}
          icon={<AiOutlineFileDone size={"3em"} />}
        />
        <StatsCard
          title={"进行中"}
          stat={"5"}
          icon={<AiOutlineThunderbolt size={"3em"} />}
        />
        <StatsCard
          title={"距离上次YouTube频道更新"}
          stat={"1"}
          icon={<AiOutlineCalendar size={"3em"} />}
        />
      </SimpleGrid>
      {isLoaded ? (
        <SimpleGrid
          columns={{ base: 1, xl: 2 }}
          spacing={5}
          width={{ base: "100%", md: "70%" }}
        >
          <VStack width={{ base: "100%", md: "100%" }}>
            {tasksData.map(taskData => (
              <TaskCard key={taskData.id} taskData={taskData} />
            ))}
          </VStack>
          <VStack width={{ base: "100%", md: "100%" }}>
            {tasksData.map(taskData => (
              <TaskCard key={taskData.id} taskData={taskData} />
            ))}
          </VStack>
        </SimpleGrid>
      ) : (
        <Spinner size={"lg"} color={"brand.light"} />
      )}
    </Flex>
  );
};

export default Kanban;
