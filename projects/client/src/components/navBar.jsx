import { SearchIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, HStack, Link, Stack, Text } from "@chakra-ui/react";
import { BsCart } from "react-icons/bs";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ProfilePict } from "./avatar";
import { ButtonTemp } from "./button";

export const Navbar = (props) => {
  const navigate = useNavigate();

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
          <ButtonTemp element={'Category'} func={() => navigate('/category')} />
          <ButtonTemp element={<SearchIcon size="xl" />} func={() => navigate('/search')} />
          <ButtonTemp element={<BsCart size="sm" />} func={() => navigate('/cart')} />
              <Avatar src={props.avatar}/>
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
