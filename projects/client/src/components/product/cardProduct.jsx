import { Box, Flex, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ModalCard } from "./modalProduct";
import { ModalAddProduct } from "./modalAddProduct";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { refreshCart } from "../../redux/cartSlice";

export const CardProduct = ({ searchResults }) => {
  const [product, setProduct] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search).get("search");

  const token = localStorage.getItem('token')
  const toast = useToast();
  const dispatch = useDispatch();

  const getProducts = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:8000/api/products?search=${searchParams}`
      );
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
  }, [searchParams]);

  const filteredProducts =
    searchResults && searchResults.length > 0 ? searchResults : product;

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

  return (
    <>
      <Flex
        gap={"10px"}
        cursor={"pointer"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        w={"80%"}
      >
        {filteredProducts.map((item, index) => (
          <ModalCard
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            quantity={item.qty}
            image={`http://localhost:8000/product/${item.image}`}
            description={item.description}
            CategoryId={item.CategoryId}
            updateQuantity={updateQuantity} // Pass the updateQuantity function
          />
        ))}
        <ModalAddProduct />
      </Flex>
    </>
  );
};
