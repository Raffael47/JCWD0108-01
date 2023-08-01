import React, { useEffect, useState } from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { ModalAddCategory } from "./modalAddCategory";
import Axios from "axios";
import { ButtonOptionCategory } from "./butttonEditDeleteCategory";
import {
  FaCocktail,
  FaCoffee,
  FaConciergeBell,
  FaFish,
  FaGlassCheers,
  FaHamburger,
} from "react-icons/fa";

const colors = [
  { color: "green.200", value: "Green" },
  { color: "blue.200", value: "Blue" },
  { color: "red.200", value: "Red" },
  { color: "yellow.200", value: "Yellow" },
  { color: "cyan.200", value: "Cyan" },
  { color: "orange.200", value: "Orange" },
];
const icons = [
  { catIcon: FaCoffee, value: "FaCoffee" },
  { catIcon: FaConciergeBell, value: "FaConciergeBell" },
  { catIcon: FaGlassCheers, value: "FaGlassCheers" },
  { catIcon: FaHamburger, value: "FaHamburger" },
  { catIcon: FaCocktail, value: "FaCocktail" },
  { catIcon: FaFish, value: "FaFish" },
];

const Card = ({ id, name, catIcon, color, quantity }) => {
  const icon = [
    { iconName: FaCoffee, value: "FaCoffee" },
    { iconName: FaConciergeBell, value: "FaConciergeBell" },
    { iconName: FaGlassCheers, value: "FaGlassCheers" },
    { iconName: FaHamburger, value: "FaHamburger" },
    { iconName: FaCocktail, value: "FaCocktail" },
    { iconName: FaFish, value: "FaFish" },
  ];

  const index = icon.findIndex((item) => item.value === catIcon);
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
          <Flex justifyContent={"space-between"} align={"flex-start"}>
            <Icon as={icon[index]?.iconName} w={8} h={8} />
            <ButtonOptionCategory
              id={id}
              name={name}
              icon={catIcon}
              icons={icons}
              color={color}
              colors={colors}
              quantity={quantity}
            />
          </Flex>
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
  const [category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getCategory = async () => {
    try {
      const response = await Axios.get("http://localhost:8000/api/categories");
      setCategory(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(category.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, category.length);
  const allCategory = category.slice(startIndex, endIndex);

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  return (
    <Flex
      gap={"10px"}
      cursor={"pointer"}
      flexWrap={"wrap"}
      justifyContent={"center"}
      w={"80%"}
    >
      {allCategory.map((item, index) => (
        <Card
          id={item.id}
          name={item.name}
          catIcon={item.icon}
          color={item.color}
          quantity={item.quantity}
        />
      ))}
      <ModalAddCategory icon={icons} color={colors} />
      <Box mt={4} justifyContent="center" alignItems="center">
        {Array.from({ length: totalPages }, (_, index) => (
          <Box
            key={index}
            cursor="pointer"
            color={currentPage === index + 1 ? "blue.500" : "gray.500"}
            onClick={() => handlePagination(index + 1)}
            mx={1}
            fontWeight={currentPage === index + 1 ? "bold" : "normal"}
          >
            {index + 1}
          </Box>
        ))}
      </Box>
    </Flex>
  );
};
