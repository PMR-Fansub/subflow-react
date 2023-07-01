import PropTypes from "prop-types";
import StatusIndicator from "./common/status-indicator";
import { Tooltip } from "@chakra-ui/react";

const TaskStatusIndicator = ({ status }) => {
  let text = "";
  let color = "";
  switch (status) {
    case 0:
      text = "待分配";
      color = "gray";
      break;
    case 1:
      text = "进行中";
      color = "teal.400";
      break;
    case 2:
      text = "已完成";
      color = "green.400";
      break;
  }
  return (
    <Tooltip label={text} placement={"top"}>
      <span>
        <StatusIndicator boxSize={3} color={color} />
      </span>
    </Tooltip>
  );
};

TaskStatusIndicator.propTypes = {
  status: PropTypes.number
};

export default TaskStatusIndicator;
