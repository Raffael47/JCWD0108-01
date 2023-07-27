import { Box, Heading, } from "@chakra-ui/react";
import { TableCart } from "../components/tabelCart";

export const Cart = () => {
  return (
    <Box p={"1%"} bgColor={"gray.300"} minH={"100vh"}>
      <Box 
      border={"2px solid black"}
      minH={"100vh"}
      m={"5%"}
      >
        <Heading
        >Your cart</Heading>
        <Box
        m={"5%"}
        >
            <TableCart/>
        </Box>
      </Box>
    </Box>
  );
};
