import React, { useState, useEffect } from "react";
import { Box, Flex, Table, Th, Tr, Td, Button, Heading } from "@chakra-ui/react";

export const TableCart = () => {
  const [cart, setCart] = useState([
    { name: "Item 1", price: 10, quantity: 1 },
    { name: "Item 2", price: 15, quantity: 2 },
    { name: "Item 3", price: 20, quantity: 3 },
    //-----------Data dummy
  ]);

  const handleChange = (index, amount) => {
    setCart((prevCart) => {
      const updateCart = [...prevCart];
      if (updateCart[index].quantity + amount >= 0) {
        updateCart[index].quantity += amount;
      }
      return updateCart;
    });
  };

  const subtotal = cart.reduce((v, item) => v + item.price * item.quantity, 0);
  //--V adalah total
  return (
    <Box bgColor="black" color="white" py={6}>
      <Table>
        <Tr>
          <Th>Name</Th>
          <Th>Price</Th>
          <Th>Quantity</Th>
          <Th>Total</Th>
        </Tr>
        {cart.map((item, index) => (
          <Tr key={index}>
            <Td>{item.name}</Td>
            <Td>{item.price}</Td>
            <Td>
              <Flex alignItems="center">
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleChange(index, -1)}
                  isDisabled={item.quantity === 0}
                >
                  -
                </Button>
                <Box mx={2}>{item.quantity}</Box>
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => handleChange(index, 1)}
                >
                  +
                </Button>
              </Flex>
            </Td>
            <Td>{item.price * item.quantity}</Td>
          </Tr>
        ))}
      </Table>
      <Flex
      justifyContent={"center"}
      p={"5%"}
      >
        <Heading as="h2" size="md" mb={2}>
          Subtotal : {subtotal}
        </Heading>
      </Flex>
    </Box>
  );
};
