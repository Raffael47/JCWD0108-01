import { Flex, Icon, Text } from "@chakra-ui/react";
import { ButtomTemp } from "../button";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

export const PaginationProduct = ({ totalpage }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const categoryId = params.get("categoryId") || "";
  const search = params.get("search") || "";
  const sort = params.get("sort") || "";
  const currentpage = Number(params.get("page")) || 1;

  console.log(totalpage);

  function handlePageChange(newPage) {
    if (newPage >= 1 && newPage <= totalpage) {
      params.set("page", newPage);
      navigate(
        `?categoryId=${categoryId}&search=${search}&sort=${sort}&page=${newPage}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    }
  }
  return (
    <Flex gap={3} alignItems={"center"} justifyContent={"center"}>
      <ButtomTemp
        isDisabled={currentpage === 1}
        content={<Icon as={FaArrowAltCircleLeft} w="5" h="5" />}
        func={() => handlePageChange(currentpage - 1)}
      />
      <Text fontWeight={"medium"} color={"white"}>
        {" "}
        Page {currentpage} of {totalpage}{" "}
      </Text>
      <ButtomTemp
        isDisabled={currentpage === totalpage || totalpage === 0}
        content={<Icon as={FaArrowAltCircleRight} w="5" h="5" />}
        func={() => handlePageChange(currentpage + 1)}
      />
    </Flex>
  );
};
