import {
  AbsoluteCenter,
  Box,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { CardCategory } from "./category/cardCategory";
import { CardProduct } from "./product/cardProduct";
import { SortingProduct } from "./product/sortingProduct";

export const ProductCategory = () => {
  return (
    <Box p={"1%"} bgColor={"#111315"} minH={"100vh"}>
      <Flex justifyContent="center" flexWrap="wrap" w={"100%"}>
        <CardCategory />
      </Flex>
      <Box position="relative" padding="10">
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          Content
        </AbsoluteCenter>
      </Box>
      <Flex justifyContent="center" flexWrap="wrap" mt={"2%"} w={"100%"}>
        <Box color={"white"} mb={5}>
        <SortingProduct/>
        </Box>
        <CardProduct />
      </Flex>
    </Box>
  );
};
