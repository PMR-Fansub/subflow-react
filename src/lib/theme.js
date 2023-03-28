// Copyright (C) 2022-2023 PMR Fansub
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const colors = {
  brand: {
    light: "#0052cc",
    dark: "#0047b3"
  },
  alucard: {
    background: "#f8f8f2",
    foreground: "#282a36",
    selection: "#e4e7fa",
    comment: "#9eaee0",
    red: "#ee4444",
    orange: "#eea75b",
    green: "#1cc647",
    blue: "#5555ff",
    purple: "#956bd1",
    cyan: "#6dcbdf",
    pink: "#e55fac"
  },
  dracula: {
    background: "#282a36",
    foreground: "#f8f8f2",
    selection: "#44475a",
    comment: "#6272a4",
    red: "#ff5555",
    orange: "#ffb86c",
    yellow: "#f1fa8c",
    green: "#50fa7b",
    purple: "#bd93f9",
    cyan: "#8be9fd",
    pink: "#ff79c6"
  }
};

const styles = {
  global: props => ({
    body: {
      bg: mode("gray.50", "gray.800")(props)
    }
  })
};

const components = {
  // Heading: {
  //   variants: {
  //     "section-title": {
  //       textDecoration: "underline",
  //       fontSize: 20,
  //       textUnderlineOffset: 6,
  //       textDecorationColor: "alucard.purple",
  //       textDecorationThickness: 4,
  //       marginTop: 3,
  //       marginBottom: 4
  //     }
  //   }
  // },
  // Link: {
  //   baseStyle: props => ({
  //     color: mode("alucard.pink", "dracula.pink")(props),
  //     textUnderlineOffset: 3
  //   })
  // }
};

const fonts = {
  // Heading: "'M PLUS Rounded 1c'"
};

const config = {
  initialColorMode: "system",
  useSystemColorMode: true
};

const theme = extendTheme({
  config,
  styles,
  components,
  colors,
  fonts
});

export default theme;
