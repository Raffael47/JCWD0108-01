import React from "react";
import { Box, Flex, Link, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box as="footer" bgColor="gray.800" color="white" py={6}>
      <Flex justifyContent="center">
        <Text>&copy; Website Name?</Text>
      </Flex>
      <Flex justifyContent="center" mt={2}>
        <Link href="#">Privacy Policy</Link>
        <Text mx={2}>|</Text>
        <Link href="#">Terms of Service</Link>
      </Flex>
    </Box>
  );
};