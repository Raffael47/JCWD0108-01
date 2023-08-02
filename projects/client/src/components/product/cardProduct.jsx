import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ModalCard } from "./modalProduct";
import { ModalAddProduct } from "./modalAddProduct";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import { PaginationProduct } from "./paginationProduct";

export const CardProduct = () => {
  const token = localStorage.getItem('token');
  const [product, setProduct] = useState([]);
  const [data, setData] = useState({});
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryId = params.get("categoryId") || "";
  const search = params.get("search") || "";
  const sort = params.get("sort") || "";
  const currentpage = Number(params.get("page")) || 1;

  const getProducts = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:8000/api/products?category=${categoryId}&search=${search}&sort=${sort}&page=${currentpage}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedProducts = response.data.result.map((item) => ({
        ...item,
        qty: 0, // Initialize quantity to 0 for each product
      }));
      setProduct(updatedProducts);
      setData({
        result: updatedProducts,
        totalpage: response.data.totalpage, // Include totalpage in the data state
      });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(product);
  useEffect(() => {
    getProducts();
  }, [categoryId, search, sort, currentpage]);

  // Function to update the quantity for a specific product
  const updateQuantity = (productId, newQuantity) => {
    setProduct((prevProducts) =>
      prevProducts.map((item) =>
        item.id === productId ? { ...item, qty: newQuantity } : item
      )
    );
  };

  console.log(data?.totalpage);
  return (
    <Box>
      <Flex justifyContent={"center"}>
        <Flex
          gap={"10px"}
          cursor={"pointer"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          w={"80%"}
        >
          {product.map((item, index) => (
            <ModalCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              quantity={item.qty}
              image={`http://localhost:8000/product/${item.image}`}
              description={item.description}
              CategoryId={item.CategoryId}
              updateQuantity={updateQuantity}
            />
          ))}
          <ModalAddProduct />
        </Flex>
      </Flex>
      <Flex justifyContent={"center"} mt={5}>
        <PaginationProduct totalpage={data.totalpage} />
      </Flex>
    </Box>
  );
};
