import { Badge } from "@chakra-ui/react";
import PropTypes from "prop-types";

const TaskStatusBadge = ({ status }) => {
  let text = "";
  let color = "";
  switch (status) {
    case 0:
      text = "待分配";
      color = "gray";
      break;
    case 1:
      text = "进行中";
      color = "teal";
      break;
    case 2:
      text = "已完成";
      color = "green";
      break;
  }
  return <Badge colorScheme={color}>{text}</Badge>;
};

TaskStatusBadge.propTypes = {
  status: PropTypes.number
};

export default TaskStatusBadge;
