import React, { useState } from "react";
import {
  Box,
  Flex,
  Button,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { CardProduct } from "./cardProduct";
import { useDispatch } from "react-redux";



export const Search = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:8000/api/products?search=${search}`
      );
      setSearchResults(response.data.result);
      console.log(response.data.result);
    } catch (err) {
      console.log(err.response);
      setSearchResults([]);
    }
  };

  const handleInputChange = (result) => {
    const inputFill = result.target.value;
    setSearchParams({ search: inputFill });
    setSearch(inputFill);
  };
  
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  return (
    <>
      <Flex h={16} alignItems={"center"} >
        <InputGroup w={"30%"}>
          <Input
            variant="outline"
            placeholder="Find Product"
            w={"100%"}
            bg={"#2d2d2d"}
            _placeholder={{ color: "white" }}
            color={"white"}
            value={search}
            onChange={handleInputChange}
          />
          {/* <InputLeftElement width="4.5rem">
            <Button
              ml={"30px"}
              h="1.75rem"
              size="sm"
              color={"gray"}
              onClick={handleSearch}
              bg={"transparent"}
            >
              <SearchIcon color={"black"} />
            </Button>
          </InputLeftElement> */}
        </InputGroup>
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}></Stack>
        </Flex>
      </Flex>
      {/* <CardProduct searchResults={searchResults} /> */}
    </>
  );
};
