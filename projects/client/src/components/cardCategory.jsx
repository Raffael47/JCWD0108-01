import React from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import {
  FaCoffee,
  FaCocktail,
  FaGlassCheers,
  FaHamburger,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const data = [
  { catIcon: FaCoffee, name: "Breakfast", quantity: 15, color: "green.200" },
  { catIcon: FaCocktail, name: "Lunch", quantity: 10, color: "blue.200" },
  { catIcon: FaGlassCheers, name: "Beers", quantity: 150, color: "red.200" },
  { catIcon: FaHamburger, name: "Snack", quantity: 11, color: "yellow.200" },
];
const Card = ({ catIcon, name, quantity, color }) => {
  return (
    <Box>
      <Flex>
        <Box
          w={"150px"}
          h={"130px"}
          bgColor={color}
          borderRadius={"lg"}
          p={"15px"}
        >
          <Icon as={catIcon} w={8} h={8} />
          <Text mt={"20px"} fontWeight={"bold"}>
            {name}
          </Text>
          <Text fontSize={"12px"} color={"gray"}>
            {quantity} items
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export const CardCategory = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <Flex
      gap={"10px"}
      cursor={"pointer"}
      flexWrap={"wrap"}
      justifyContent={"center"}
      w={"80%"}
    >
      {data.map((item) => {
        return (
          <Card
            catIcon={item.catIcon}
            name={item.name}
            quantity={item.quantity}
            color={item.color}
            onClick={handleClick}
          />
        );
      })}
    </Flex>
  );
};
