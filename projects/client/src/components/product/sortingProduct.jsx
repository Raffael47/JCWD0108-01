import React, { useState } from "react";
import { Flex, Switch, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

export const SortingProduct = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryId = params.get("categoryId") || "";
  const search = params.get("search") || "";
  const sort = params.get("sort") || "";
  const [sortOption, setSortOption] = useState(sort);
  const navigate = useNavigate();

  const handleSort = (result) => {
    if (result === sort) {
      navigate(`?categoryId=${categoryId}&search=${search}&sort=`);
    } else {
      navigate(
        `?categoryId=${categoryId}&search=${search}&sort=${result.target.value}`
      );
    }
  };

  const switchLabelStyle = { fontSize: "sm", ml: 1 };

  return (
    <Flex
      w="100%"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      mt={2}
    >
      <Flex alignItems="center" mr={4}>
        <Switch
          flex={1}
          size="md"
          colorScheme={sortOption === "az" ? "blue" : "gray"}
          isChecked={sort === "az"}
          onChange={() => {
            setSortOption("az");
            handleSort({ target: { value: "az" } });
          }}
        />
        <Text {...switchLabelStyle}>A-Z</Text>
      </Flex>

      <Flex alignItems="center" mr={4}>
        <Switch
          flex={1}
          size="md"
          colorScheme={sortOption === "za" ? "blue" : "gray"}
          isChecked={sort === "za"}
          onChange={() => {
            setSortOption("za");
            handleSort({ target: { value: "za" } });
          }}
        />
        <Text {...switchLabelStyle}>Z-A</Text>
      </Flex>

      <Flex alignItems="center" mr={4}>
        <Switch
          flex={1}
          size="md"
          colorScheme={sortOption === "desc" ? "blue" : "gray"}
          isChecked={sort === "desc"}
          onChange={() => {
            setSortOption("desc");
            handleSort({ target: { value: "desc" } });
          }}
        />
        <Text {...switchLabelStyle}>Highest</Text>
      </Flex>

      <Flex alignItems="center">
        <Switch
          flex={1}
          size="md"
          colorScheme={sortOption === "asc" ? "blue" : "gray"}
          isChecked={sort === "asc"}
          onChange={() => {
            setSortOption("asc");
            handleSort({ target: { value: "asc" } });
          }}
        />
        <Text {...switchLabelStyle}>Lowest</Text>
      </Flex>
    </Flex>
  );
};
