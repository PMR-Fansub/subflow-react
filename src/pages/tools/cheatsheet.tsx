// Copyright (C) 2022-2023 PMR Fansub
//
// SPDX-License-Identifier: GPL-3.0-or-later

import {
  Container,
  Flex,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import _characters from "./characters.json";
import _series from "./series.json";

interface TranslationProps {
  romaji: string;
  source: string;
  target: string;
  notes?: string;
}

interface TranslationTableProps {
  name: string;
  data: TranslationProps[];
}

const TranslationTable = ({ name, data }: TranslationTableProps) => (
  <Table colorScheme="blue">
    <TableCaption placement="top">{name}</TableCaption>
    <Thead>
      <Tr>
        <Th>原文</Th>
        <Th hideBelow="md">罗马字</Th>
        <Th>译文</Th>
        <Th>备注</Th>
      </Tr>
    </Thead>
    <Tbody>
      {data.map((item: TranslationProps) => (
        <Tr key={item.romaji}>
          <Td minW={{ base: "auto", md: 60 }}>{item.source}</Td>
          <Td hideBelow="md">{item.romaji}</Td>
          <Td minW={{ base: "auto", md: 48 }}>{item.target}</Td>
          <Td>{item.notes ?? "-"}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

const CheatSheet = () => {
  const characters = _characters as TranslationProps[];
  const series = _series as TranslationProps;

  return (
    <Container maxW="5xl">
      <Flex flexDir="column" gap={8}>
        <TranslationTable name="系列名" data={series} />
        <TranslationTable name="人物名" data={characters} />
      </Flex>
    </Container>
  );
};

export default CheatSheet;
