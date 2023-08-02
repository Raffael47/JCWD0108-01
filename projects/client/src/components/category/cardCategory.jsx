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
import { useLocation, useNavigate, useParams } from "react-router-dom";

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

export const CardCategory = ({ onSelectCategory }) => {
  const token = localStorage.getItem("token");
  const [category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryId = params.get("categoryId");
  const search = params.get("search");

  const navigate = useNavigate();

  const onSelect = (CategoryId) => {
    if (CategoryId == categoryId) {
      navigate(`?categoryId=&search=${search}`);
    } else {
      navigate(`?categoryId=${CategoryId}&search=${search}`);
    }
  };

  const getCategory = async () => {
    try {
      const response = await Axios.get("http://localhost:8000/api/categories", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setCategory(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
    const page = Number(params.page) || 1;
    setCurrentPage(page);
  }, [params.page]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(category.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, category.length);
  const allCategory = category.slice(startIndex, endIndex);

  const handlePagination = (page) => {
    setCurrentPage(page);
    navigate(`../?page=${page}`);
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
        <Box
          key={item.id}
          w={"150px"}
          h={"130px"}
          bgColor={item.color}
          borderRadius={"lg"}
          p={"15px"}
        >
          <Flex justifyContent={"space-between"} align={"flex-start"}>
            <Icon
              as={icons.find((icon) => icon.value === item.icon)?.catIcon}
              w={8}
              h={8}
              onClick={() => onSelect(item.id)}
              color={item.id == categoryId ? "white" : "black"}
            />
            <ButtonOptionCategory
              id={item.id}
              name={item.name}
              icon={item.icon}
              icons={icons}
              color={item.color}
              colors={colors}
              quantity={item.quantity}
            />
          </Flex>
          <Text
            mt={"20px"}
            fontWeight={"bold"}
            onClick={() => onSelect(item.id)}
          >
            {item.name}
          </Text>
          <Text
            fontSize={"12px"}
            color={"gray"}
            onClick={() => onSelect(item.id)}
          >
            {item.quantity} items
          </Text>
        </Box>
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
