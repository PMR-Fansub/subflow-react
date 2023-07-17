// Copyright (C) 2022-2023 PMR Fansub
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

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
