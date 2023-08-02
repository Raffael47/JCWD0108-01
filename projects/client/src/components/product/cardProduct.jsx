import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ModalCard } from "./modalProduct";
import { ModalAddProduct } from "./modalAddProduct";
import Axios from "axios";
import { useLocation } from "react-router-dom";

export const CardProduct = () => {
  const [product, setProduct] = useState([]);
  const [data, setData] = useState({});
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryId = params.get("categoryId");
  const search = params.get("search")

  console.log(categoryId);
  const getProducts = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:8000/api/products?category=${categoryId}&search=${search}`
      );
      const updatedProducts = response.data.result.map((item) => ({
        ...item,
        qty: 0, // Initialize quantity to 0 for each product
      }));
      setProduct(updatedProducts);
      setData(response.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(product);
  useEffect(() => {
    getProducts();
  }, [categoryId, search]);

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
    </Box>
  );
};
