import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import Axios from "axios";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

export const ModalAddProduct = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem('token')

  const toast = useToast();

  const CreateSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    file: Yup.mixed().required("Image is required"),
    price: Yup.number().required("Price is required"),
    description: Yup.string().required("Description is required"),
    CategoryId: Yup.string().required("Category is required"),
  });

  const handleSubmit = async (data) => {
    try {
      const { name, file, price, CategoryId, description } = data;
      console.log(data);
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({ name, price, CategoryId, description })
      );
      formData.append("file", file);

      const response = await Axios.post(
        "http://localhost:8000/api/products",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          "Content-type": "multipart/form-data",
        }
      );
      console.log(response);
      toast({
        title: "Product Created",
        description: "Your product has been created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "An error occurred while creating product.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getCategory = async () => {
    try {
      const response = await Axios.get("http://localhost:8000/api/categories/",{
        headers: {
            authorization: `Bearer ${token}`
        }
    });
      setCategories(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Formik
      initialValues={{
        name: "",
        CategoryId: "",
        file: "",
        price: "",
        description: "",
      }}
      validationSchema={CreateSchema}
      onSubmit={(data, actions) => {
        handleSubmit(data);
        actions.resetForm();
        onClose();
      }}
    >
      {(props) => {
        return (
          <Box as={Form}>
            <Box onClick={onOpen}>
              <Flex>
                <Stack
                  w={"150px"}
                  h={"130px"}
                  bgColor={"#2d2d2d"}
                  borderRadius={"lg"}
                  p={"15px"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  borderRight={"7px solid green"}
                >
                  <Icon as={FiPlus} w={8} h={8} color={"white"} />
                  <Text mt={"5px"} fontWeight={"bold"} color={"white"}>
                    {"Add Product"}
                  </Text>
                </Stack>
              </Flex>
            </Box>

            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Product detail</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box as={Form}>
                    <FormControl>
                      <FormLabel textColor={"black"}>Name</FormLabel>
                      <ErrorMessage
                        component="div"
                        name="name"
                        style={{ color: "red" }}
                      />
                      <Input
                        as={Field}
                        variant="flushed"
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        mb={4}
                        bgColor={"white"}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel textColor={"black"}>Category</FormLabel>
                      <Field
                        as={Select}
                        name="CategoryId"
                        placeholder="Select Category"
                      >
                        {categories?.map((v, i) => {
                          return (
                            <option key={i} value={v.id}>
                              {v.name}
                            </option>
                          );
                        })}
                      </Field>
                      <ErrorMessage
                        component="div"
                        name="CategoryId"
                        style={{ color: "red" }}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel textColor={"black"}>Image</FormLabel>
                      <ErrorMessage
                        component="div"
                        name="file"
                        style={{ color: "red" }}
                      />
                      <Input
                        onChange={(e) => {
                          props.setFieldValue("file", e.target.files[0]);
                        }}
                        variant="flushed"
                        type="file"
                        name="file"
                        placeholder="Choose file"
                        mb={4}
                        bgColor={"white"}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel textColor={"black"}>Price</FormLabel>
                      <ErrorMessage
                        component="div"
                        name="price"
                        style={{ color: "red" }}
                      />
                      <Input
                        as={Field}
                        variant="flushed"
                        type="number"
                        name="price"
                        placeholder="How much?"
                        mb={4}
                        bgColor={"white"}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel textColor={"black"}>Description</FormLabel>
                      <ErrorMessage
                        component="div"
                        name="description"
                        style={{ color: "red" }}
                      />
                      <Input
                        as={Field}
                        variant="flushed"
                        type="text"
                        name="description"
                        placeholder="Write your description"
                        mb={4}
                        bgColor={"white"}
                      />
                    </FormControl>
                  </Box>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="red" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button colorScheme="green" onClick={props.handleSubmit}>
                    Accept
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        );
      }}
    </Formik>
  );
};
