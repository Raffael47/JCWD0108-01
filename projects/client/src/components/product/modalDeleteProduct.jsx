import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from "@chakra-ui/react";
import Axios from "axios";

export const ModalDeleteProduct = ({ ProductId, isOpen, onClose }) => {
  const finalRef = React.useRef(null);
  const toast = useToast();
  const token = localStorage.getItem('token')

  const handleSubmit = async () => {
    try {
      const response = await Axios.delete(
        `http://localhost:8000/api/products/deactivate/${ProductId}`, {},
         {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Product deleted",
        description: "Your product has been deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      window.location.reload();
    } catch (err) {
      console.log(err.response);
      toast({
        title: "Error",
        description: "An error occurred while deleted product.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Are you sure you want to deactive this product?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="red"
              type="submit"
              onClick={() => handleSubmit()}
            >
              Accept
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
