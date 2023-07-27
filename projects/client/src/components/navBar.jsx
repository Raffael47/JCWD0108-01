import { SearchIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, HStack, Link, Stack, Text } from "@chakra-ui/react";
import { BsCartPlus } from "react-icons/bs";
import React from "react";
import { Outlet } from "react-router-dom";
import { ProfilePict } from "./avatar";

export const Navbar = () => {
  return (
    <Box>
      <Flex
        as="nav"
        justify="space-between"
        alignItems="center"
        padding="1rem"
        bg="black"
        color="white"
      >
        <Flex alignItems="center">
          <Text fontSize="2xl" fontWeight="extrabold">
            <Link>Fast food furious</Link>
          </Text>
        </Flex>

        <HStack spacing={4}>
          <Text fontSize="xl" fontWeight="bold">
            <Link>Category</Link>
          </Text>
          <Button bg="transparent" color="white" h="1.75rem">
            <SearchIcon size="xl" />
          </Button>
          <Button bg="transparent" color="white" h="1.75rem">
            <BsCartPlus size="xl" />
          </Button>
              <ProfilePict size="2rem" color="blue" />
          <Link mr={4} align="center">
            <Stack>
              <Box>
                {/* <Text fontWeight="bold">{data.username}</Text> */}
              </Box>
            </Stack>
          </Link>
        </HStack>
      </Flex>
      <Outlet />
    </Box>
  );
};
