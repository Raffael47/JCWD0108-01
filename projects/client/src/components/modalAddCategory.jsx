import React from "react";
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
import { FaCocktail, FaCoffee, FaConciergeBell, FaFish, FaGlassCheers, FaHamburger } from "react-icons/fa";

const color = [
  {color: "green.200", value: "Green"},
  {color: "blue.200",value: "Blue"},
  {color: "red.200",value: "Red"},
  {color: "yellow.200",value: "Yellow"},
  {color: "cyan.200",value: "Cyan"},
  {color: "orange.200",value: "Orange"},
]
const icon = [
  {catIcon: FaCoffee, value: "FaCoffee"},
  {catIcon: FaConciergeBell,  value: "FaConciergeBell"},
  {catIcon: FaGlassCheers, value: "FaGlassCheers"},
  {catIcon: FaHamburger, value: "FaHamburger"},
  {catIcon: FaCocktail, value: "FaCocktail"},
  {catIcon: FaFish, value: "FaFish"},
]

export const ModalAddCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  // const token = localStorage.getItem("token");
  const toast = useToast();

  const CreateSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    icon: Yup.string().required("Icon is required"),
    color: Yup.string().required("Color is required"),
    quantity: Yup.string().required("Quantity is required"),

  });

  const handleSubmit = async (data) => {
    try {
      const { name, icon, color } = data;
      console.log(data);
      const formData = new FormData();
      formData.append("data", JSON.stringify({ name, icon, color }));

      const response = await Axios.post(
        "http://localhost:8000/api/categories/",
        data
      );
      toast({
        title: "Category Created",
        description: "Your category has been created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "An error occurred while creating category.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        icon: "",
        color: "",
        quantity: ""
      }}
      validationSchema={CreateSchema}
      onSubmit={(values, actions) => {
        handleSubmit(values); 
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
                  bgColor={"gray"}
                  borderRadius={"lg"}
                  p={"15px"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Icon as={FiPlus} w={8} h={8} />
                  <Text mt={"5px"} fontWeight={"bold"}>
                    {"Add category"}
                  </Text>
                </Stack>
              </Flex>
            </Box>

            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Category detail</ModalHeader>
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
                        placeholder="Enter category name"
                        mb={4}
                        bgColor={"white"}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel textColor={"black"}>Icon</FormLabel>
                      <Field
                        as={Select}
                        placeholder="Select Icon"
                        name="icon"
                      >
                        {icon?.map((v, i) => {
                          return (
                            <option key={i}>
                              {v.value}
                            </option>
                          );
                        })}
                      </Field>
                      <ErrorMessage
                        component="div"
                        name="icon"
                        style={{ color: "red" }}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel textColor={"black"}>Color</FormLabel>
                      <Field
                        as={Select}
                        placeholder="Select Icon"
                        name="color"
                      >
                        {color?.map((v, i) => {
                          return (
                            <option key={i}>
                              {v.value}
                            </option>
                          );
                        })}
                      </Field>
                      <ErrorMessage
                        component="div"
                        name="color"
                        style={{ color: "red" }}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel textColor={"black"}>Quantity</FormLabel>
                      <ErrorMessage
                        component="div"
                        name="quantity"
                        style={{ color: "red" }}
                      />
                      <Input
                        as={Field}
                        variant="flushed"
                        type="number"
                        name="quantity"
                        placeholder="Enter quantity of item"
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
