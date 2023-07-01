import { useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Card,
  CardBody,
  HStack,
  Skeleton,
  Tag,
  TagLabel,
  Text,
  useToast
} from "@chakra-ui/react";
import axios from "../config/axios";
import {
  getDataFromResponse,
  getErrorMessageFromError
} from "../utils/request-helper";
import PropTypes from "prop-types";
import TaskStatusBadge from "./task-status-badge";
import TaskDefKeyIcon from "./task-def-key-icon";
import TaskStatusIndicator from "./task-status-indicator";
import { msToFriendlyTime } from "../utils/time-helper";

const TaskCard = ({ taskData }) => {
  const [detailedTaskData, setDetailedTaskData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const toast = useToast();

  const fetchDetailedTaskData = () => {
    setIsLoaded(false);
    axios
      .get(`/task/detail/${taskData.id}`)
      .then(response => {
        setDetailedTaskData(getDataFromResponse(response));
      })
      .catch(error => {
        const errorMessage = getErrorMessageFromError(error);
        toast({
          title: "详细任务加载失败",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true
        });
      })
      .finally(() => {
        setIsLoaded(true);
      });
  };

  const handleAccordionChange = expandedIndex => {
    setIsLoaded(false);
    if (expandedIndex === -1) {
      return;
    }
    fetchDetailedTaskData();
  };

  return (
    <Card width={{ base: "100%", md: "100%" }}>
      <CardBody>
        <Accordion allowToggle onChange={handleAccordionChange}>
          <AccordionItem key={taskData.id} border={"none"}>
            <AccordionButton>
              <Box as="span" flex={1}>
                <HStack>
                  <Tag size={"sm"} mr={2}>
                    <TagLabel>#{taskData.id}</TagLabel>
                  </Tag>
                  <Text>{taskData.name}</Text>
                  <TaskStatusBadge status={taskData.status} />
                </HStack>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              {isLoaded ? (
                <>
                  {detailedTaskData.subTasks.map(subTask => (
                    <HStack key={subTask.id} height={"40px"}>
                      <TaskStatusIndicator status={subTask.status} />
                      <TaskDefKeyIcon taskDefKey={subTask.taskDefKey} />
                      <Text>{subTask.name}</Text>
                      {subTask.assignee && (
                        <HStack>
                          <Avatar
                            size={"xs"}
                            name={subTask.assignee.username}
                          />
                          <Text>{subTask.assignee.nickname}</Text>
                          {subTask.duration && (
                            <Text fontSize={"xs"} color={"gray"}>
                              用时{msToFriendlyTime(subTask.duration)}
                            </Text>
                          )}
                        </HStack>
                      )}
                    </HStack>
                  ))}
                </>
              ) : (
                <Skeleton />
              )}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  );
};

TaskCard.propTypes = {
  taskData: PropTypes.object
};

export default TaskCard;
