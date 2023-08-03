import {
  Box,
  Flex,
  Text,
  IconButton,
  css,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { React, useState } from "react";
import { ButtonOptionProduct } from "./buttonEditDeleteProduct";
import { convertToRp } from "../../helper/rupiah";
import { useSelector } from "react-redux";

const slowColorChangeAnimation = css`
  @keyframes slowColorChange {
    0% {
      background-color: white;
    }
    100% {
      background-color: white;
    }
  }
`;

export const ModalProductCard = ({
  id,
  name,
  price,
  quantity,
  categoryId,
  image,
  description,
  isDeleted,
  updateQuantity, // Receive the updateQuantity function as a prop
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const dataRedux = useSelector((state) => state.accountSlice?.value);
  const minus = () => {
    updateQuantity(id, Math.max(quantity - 1, 0));
  };

  const plus = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleCardClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Box>
      <Flex>
        <Box
          w={"150px"}
          h={"130px"}
          bg={quantity > 0 ? "red.200" : "#2d2d2d"}
          borderLeft={"7px solid"}
          borderLeftColor={"red.200"}
          borderRadius={"lg"}
          p={"15px"}
          cursor="pointer"
          transition="background 0.5s ease-in-out"
          animation={`${slowColorChangeAnimation} 1s ease-in-out`}
        >
          <Flex justifyContent={"space-between"}>
            <Text
              fontWeight={"bold"}
              onClick={handleCardClick}
              color={quantity > 0 ? "black" : "white"}
              _hover={{ color: "blue.200" }}
            >
              {name}
            </Text>
            {/* Isi di componentnya yg dibutuhin */}
            {dataRedux.isAdmin ? (
              <ButtonOptionProduct
                ProductId={id}
                name={name}
                price={price}
                quantity={quantity}
                description={description}
                categoryId={categoryId}
              />
            ) : null}
          </Flex>
          <Text fontSize={"12px"} color={quantity > 0 ? "black" : "white"} mt={"10px"}>
            {price}
          </Text>
          <Flex
            justifyContent={"end"}
            mt={"35px"}
            display={isDeleted === true ? "none" : "flex"}
          >
            <IconButton
              aria-label="Decrement"
              icon={<MinusIcon w={2} />}
              bg={"transparent"}
              size="xs"
              onClick={minus}
              color={quantity > 0 ? "black" : "white"}
              border={"1px solid"}
              borderColor={quantity > 0 ? "black" : "white"}
            />
            <Text mx={2} color={quantity > 0 ? "black" : "white"}>
              {quantity}
            </Text>
            <IconButton
              aria-label="Increment"
              icon={<AddIcon w={2} />}
              bg={"transparent"}
              size="xs"
              onClick={plus}
              color={quantity > 0 ? "black" : "white"}
              border={"1px solid"}
              borderColor={quantity > 0 ? "black" : "white"}
            />
          </Flex>
        </Box>
      </Flex>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box mt="4">
                <img src={image} alt={name} style={{ maxWidth: "100%", height: "auto" }} />
              </Box>
              <Text fontWeight="bold">{name}</Text>
              <Text fontSize="12px" color="gray" mt="10px">
                {convertToRp(price)}
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};
