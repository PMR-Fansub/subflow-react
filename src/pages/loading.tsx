// Copyright (C) 2022-2023 PMR Fansub
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { Flex, Spinner, Text } from "@chakra-ui/react";

const Loading = () => {
  const getRandomLoadingText = () => {
    const loadingTexts = [
      "组长祈祷中...",
      "翻译挠头中...",
      "校对血压上升中...",
      "时轴对帧中..."
    ];
    return loadingTexts[Math.floor(Math.random() * loadingTexts.length)];
  };
  return (
    <Flex direction="column" width="100vw" align="center">
      <Spinner color="brand.light" size="xl" />
      <Text marginTop={5} color="gray.500">
        {getRandomLoadingText()}
      </Text>
    </Flex>
  );
};

export default Loading;
