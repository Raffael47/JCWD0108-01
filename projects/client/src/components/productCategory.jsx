import { AbsoluteCenter, Box, Divider, Flex } from "@chakra-ui/react";
import { CardCategory } from "../components/category/cardCategory";
import { CardProduct } from "../components/product/cardProduct";

export const ProductCategory = () => {
  try {
  } catch (err) {
    console.log(err);
  }

  return (
    <Box p={"1%"} bgColor={"#111315"} minH={"100vh"}>
      <Flex
        justifyContent="center"
        flexWrap="wrap"
        w={"100%"}
      >
        <CardCategory />
      </Flex>
      <Box position="relative" padding="10">
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          Content
        </AbsoluteCenter>
      </Box>
      <Flex
        justifyContent="center"
        flexWrap="wrap"
        mt={"2%"}
        w={"100%"}
      >
        <CardProduct />
      </Flex>
    </Box>
  );
};
