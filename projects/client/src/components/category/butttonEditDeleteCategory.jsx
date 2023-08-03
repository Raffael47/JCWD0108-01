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
import { ModalEditCategory } from "./modalEditCategory";
import { ModalDeleteCategory } from "./modalDeleteCategory";

export const ButtonOptionCategory = ({
  id,
  name,
  icons,
  icon,
  color,
  colors,
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
                  Delete
                </Button>
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      <ModalEditCategory
        id={id}
        name={name}
        icons={icons}
        icon={icon}
        color={color}
        colors={colors}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ModalDeleteCategory
        id={id}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        handleDeleteClick={handleDeleteClick}
      />
    </Box>
  );
};
