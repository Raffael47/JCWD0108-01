import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Button,
  Stack,
  Flex,
  Box,
} from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ModalEditProduct } from "./modalEditProduct";
import { ModalDeleteProduct } from "./modalDeleteProduct"; 
import { MdAutorenew } from "react-icons/md";
import { ModalActiveProduct } from "./modalActiveProduct";

export const ButtonOptionProduct = ({
  ProductId,
  name,
  price,
  categoryId,
  quantity,
  description,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <Box>
      <Flex justifyContent="center" alignItems="flex-start">
        <Popover placement="bottom" isLazy>
          <PopoverTrigger>
            <IconButton
              aria-label="More server options"
              icon={<BsThreeDotsVertical />}
              variant="solid"
              w="fit-content"
              bg="transparent"
              size="xs"
              color="white"
            />
          </PopoverTrigger>
          <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
            <PopoverArrow />
            <PopoverBody>
              <Stack>
                <Button
                  w="194px"
                  variant="ghost"
                  rightIcon={<BiEditAlt />}
                  justifyContent="space-between"
                  fontWeight="normal"
                  fontSize="sm"
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
                <Button
                  w="194px"
                  variant="ghost"
                  rightIcon={<RiDeleteBin6Line />}
                  justifyContent="space-between"
                  fontWeight="normal"
                  colorScheme="red"
                  fontSize="sm"
                  onClick={handleDeleteClick}
                >
                  Deactive
                </Button>
                <Button
                  w="194px"
                  variant="ghost"
                  rightIcon={<MdAutorenew />}
                  justifyContent="space-between"
                  fontWeight="normal"
                  colorScheme="green"
                  fontSize="sm"
                  onClick={handleDeleteClick}
                >
                  Active
                </Button>
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      <ModalEditProduct
        ProductId={ProductId}
        name={name}
        price={price}
        quantity={quantity}
        categoryId={categoryId}
        description={description}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ModalDeleteProduct
        ProductId={ProductId}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        handleDeleteClick={handleDeleteClick}
      />
      <ModalActiveProduct
        ProductId={ProductId}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        handleDeleteClick={handleDeleteClick}
      />
    </Box>
  );
};
