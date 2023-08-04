import React, { useEffect, useState } from "react";
import { Box, Flex, Icon, Text, Button, ButtonGroup } from "@chakra-ui/react";
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
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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

export const CardCategory = () => {
  const [category, setCategory] = useState([]);
  const [total, setTotal] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryId = params.get("categoryId") || "";
  const search = params.get("search") || "";
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const dataRedux = useSelector((state) => state.accountSlice?.value)

  const onSelect = (CategoryId) => {
    if (CategoryId == categoryId) {
      navigate(`?categoryId=&search=${search}`);
    } else {
      navigate(`?categoryId=${CategoryId}&search=${search}`);
    }
  };
  const getCategory = async () => {
    try {
      const response = await Axios.get(`http://localhost:8000/api/categories`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setCategory(response.data.result);
      setTotal(response.data.totalProduct);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = category.slice(indexOfFirstItem, indexOfLastItem);

  console.log(dataRedux);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      <Flex
        gap={"10px"}
        cursor={"pointer"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        w={"80%"}
      >
        {currentItems.map((item, index) => (
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
              {dataRedux.isAdmin ? (
                <ButtonOptionCategory
                  id={item.id}
                  name={item.name}
                  icon={item.icon}
                  icons={icons}
                  color={item.color}
                  colors={colors}
                />
              ) : null }
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
              {total.find((el) => el.CategoryId === item.id)?.total || 0} items
            </Text>
          </Box>
        ))}
        {dataRedux.isAdmin ? (
          <ModalAddCategory icon={icons} color={colors} /> ) : null}
      </Flex>
      <Flex justifyContent={"center"} mt={5}>
        <ButtonGroup>
          {Array.from({
            length: Math.ceil(category.length / itemsPerPage),
          }).map((_, index) => (
            <Button
              key={index}
              onClick={() => paginate(index + 1)}
              variant={currentPage === index + 1 ? "solid" : "outline"}
              colorScheme={index % 2 === 0 ? "blue" : "red"} 
            >
              {index + 1}
            </Button>
          ))}
        </ButtonGroup>
      </Flex>
    </Flex>
  );
};
