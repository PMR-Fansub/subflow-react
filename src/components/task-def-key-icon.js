import PropTypes from "prop-types";
import { Icon } from "@chakra-ui/react";
import { BsTranslate } from "react-icons/bs";
import { CgTranscript } from "react-icons/cg";
import { FiUserCheck } from "react-icons/fi";
import { TbFileCheck } from "react-icons/tb";

const TaskDefKeyIcon = ({ taskDefKey }) => {
  let asIcon;
  switch (taskDefKey) {
    case "translate":
      asIcon = BsTranslate;
      break;
    case "timeline":
      asIcon = CgTranscript;
      break;
    case "proofread":
      asIcon = TbFileCheck;
      break;
    case "final-check":
      asIcon = FiUserCheck;
      break;
  }
  return <Icon as={asIcon} />;
};

TaskDefKeyIcon.propTypes = {
  taskDefKey: PropTypes.string
};

export default TaskDefKeyIcon;
