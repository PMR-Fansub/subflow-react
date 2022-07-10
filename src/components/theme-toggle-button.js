import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ThemeToggleButton = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle theme"
      colorScheme={useColorModeValue("messenger", "orange")}
      icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
      variant="ghost"
      onClick={toggleColorMode}
    ></IconButton>
  );
};

export default ThemeToggleButton;
