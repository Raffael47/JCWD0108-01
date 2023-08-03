import React from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

export const Search = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryId = params.get("categoryId");
  const search = params.get("search");

  const navigate = useNavigate();

  const handleInputChange = (result) => {
    navigate(`?categoryId=${categoryId}&search=${result.target.value}`)
  };
  
  return (
        <InputGroup w={"30%"} >
          <Input
            variant="outline"
            placeholder="Search"
            w={"100%"}
            bg={"#2d2d2d"}
            _placeholder={{ color: "white" }}
            defaultValue={search}
            type={"search"}
            color={"white"}
            onChange={handleInputChange}
            border={"none"}
          />
          <InputLeftElement>
          <Icon as={BsSearch} color={"gray.500"}/>
          </InputLeftElement>
        </InputGroup>
  );
};
