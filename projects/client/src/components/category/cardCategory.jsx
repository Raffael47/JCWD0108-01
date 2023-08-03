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
import { useLocation, useNavigate } from "react-router-dom";
import { PaginationCategory } from "./paginationCategory";

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
  const [data, setData] = useState({});
  const [total, setTotal] = useState({});
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryId = params.get("categoryId") || "";
  const search = params.get("search") || "";
  const pageNow = Number(params.get("page")) || 1;
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
      const response = await Axios.get(
        `http://localhost:8000/api/categories?page=${pageNow}`
      );
      setCategory(response.data.result);
      setData({
        totalpage: response.data.totalpage,
      });
      setTotal(response.data.totalProduct);
      console.log(response.data.totalProduct);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, [pageNow]);
  return (
    <Flex flexDirection="column" alignItems="center">
      <Flex
        gap={"10px"}
        cursor={"pointer"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        w={"80%"}
      >
        {category.map((item, index) => (
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
              {total.find((el) => el.CategoryId === item.id)?.total || 0} items
            </Text>
          </Box>
        ))}
        <ModalAddCategory icon={icons} color={colors} />
      </Flex>
      <Flex justifyContent={"center"} mt={5}>
        <PaginationCategory totalpage={data.totalpage} />
      </Flex>
    </Flex>
  );
};
