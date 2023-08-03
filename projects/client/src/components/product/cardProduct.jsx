import { Box, Flex, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ModalCard } from "./modalProduct";
import { ModalAddProduct } from "./modalAddProduct";
import Axios from "axios";
import { useLocation } from "react-router-dom";

export const CardProduct = () => {
  const token = localStorage.getItem('token');
  const [product, setProduct] = useState([]);
  const [data, setData] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search).get("search");
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
    updateCart({ ProductId: productId, quantity: newQuantity })
    dispatch(refreshCart())
  };

  const updateCart = async(value) => {
    try {
      await Axios.post('http://localhost:8000/api/transactions', value, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
    } catch (err) {
      console.log(err);
      toast({
        title: 'Failed to update cart',
        status: 'error',
        isClosable: true
      });
    }
  }

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
              price={convertToRp(item.price)}
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
