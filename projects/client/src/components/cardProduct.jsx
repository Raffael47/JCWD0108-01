import {
  Flex,
} from "@chakra-ui/react";
import  React from "react";
import { ModalCard } from "./modalProduct";

const data = [
  {
    name: "Caviar",
    price: 15000,
    color: "green.200",
    image:
      "https://awsimages.detik.net.id/community/media/visual/2018/04/05/4a85bb1c-9670-4b18-807c-035ec0523b9c.jpeg",
  },
  { name: "Kerak telor", price: 2000, color: "red.200" },
  { name: "Mie naripan", price: 10000, color: "yellow.200" },
  { name: "Sake", price: 17000, color: "blue.200" },
  { name: "Miegor", price: 17000, color: "blue.200" },
  { name: "Nasgor", price: 10000, color: "yellow.200" },
  { name: "Baso", price: 15000, color: "green.200" },
  { name: "Fu yung hai", price: 2000, color: "red.200" },
];

export const CardProduct = () => {
  return (
    <Flex gap={"10px"} cursor={"pointer"} flexWrap={"wrap"} justifyContent={"center"} w={"80%"}>
      {data.map((item) => {
        return <ModalCard name={item.name} price={item.price} image={item.image} />;
      })}
    </Flex>
  );
};
