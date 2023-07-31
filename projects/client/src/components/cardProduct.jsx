import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ModalCard } from "./modalProduct";
import { ModalAddProduct } from "./modalAddProduct";
import Axios from "axios";

export const CardProduct = () => {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getProducts = async () => {
    try {
      const response = await Axios.get("http://localhost:8000/api/products");
      const updatedProducts = response.data.result.map((item) => ({
        ...item,
        qty: 0, // Initialize quantity to 0 for each product
      }));
      setProduct(updatedProducts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(product.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, product.length);
  const allProduct = product.slice(startIndex, endIndex);

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  // Function to update the quantity for a specific product
  const updateQuantity = (productId, newQuantity) => {
    setProduct((prevProducts) =>
      prevProducts.map((item) =>
        item.id === productId ? { ...item, qty: newQuantity } : item
      )
    );
  };

  return (
    <>
      <Flex
        gap={"10px"}
        cursor={"pointer"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        w={"80%"}
      >
        {allProduct.map((item, index) => (
          <ModalCard
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            quantity={item.qty}
            image={`http://localhost:8000/product/${item.image}`}
            description={item.description}
            updateQuantity={updateQuantity} // Pass the updateQuantity function
          />
        ))}
        <ModalAddProduct />
      </Flex>
      <Box mt={4} justifyContent="center" alignItems="center">
        {Array.from({ length: totalPages }, (_, index) => (
          <Box
            key={index}
            cursor="pointer"
            color={currentPage === index + 1 ? "blue.500" : "gray.500"}
            onClick={() => handlePagination(index + 1)}
            mx={1}
            fontWeight={currentPage === index + 1 ? "bold" : "normal"}
            _focus={{ boxShadow: "none" }}
          >
            {index + 1}
          </Box>
        ))}
      </Box>
    </>
  );
};
