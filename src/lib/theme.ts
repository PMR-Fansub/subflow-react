// Copyright (C) 2022-2023 PMR Fansub
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const colors = {
  brand: {
    light: "#0052cc",
    dark: "#0047b3"
  }
};

const styles = {
  global: (props: StyleFunctionProps) => ({
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
