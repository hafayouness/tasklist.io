"use client";

import { Flex, Heading, Text, Input, Button } from "@chakra-ui/react";

function Header() {
  return (
    <>
      <Flex p="2rem" direction="column" alignItems="center">
        <Heading as="h1" size="4xl" noOfLines={1} className="tasklist-title">
          TaskList.io
        </Heading>
        <Text mt="1rem" className="tasklist-solgan">
          TaskList est un outil open-source qui vous simplifier votre quotidien
          en toute effecacite.
        </Text>
      </Flex>
    </>
  );
}

export default Header;
