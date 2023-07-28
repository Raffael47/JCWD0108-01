import React from "react";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  //   const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>Logo</Box>
          <InputGroup w={"30%"}>
            <Input
              variant="outline"
              placeholder="Find Product"
              w={"100%"}
              bg={"white"}
              _placeholder={{ color: "black" }}
              color={"black"}
            />
            <InputRightElement width="4.5rem">
              <Button
                ml={"30px"}
                h="1.75rem"
                size="sm"
                bg={"white"}
                color={"gray"}
              >
                <SearchIcon color={"black"} />
              </Button>
            </InputRightElement>
          </InputGroup>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode} bg={"transparent"}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <Center>
                    <Text>Username</Text>
                  </Center>
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
