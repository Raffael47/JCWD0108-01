import {
  Button,
  FormControl,
  Select,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import Axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

export const ModalEditProduct = ({
  ProductId,
  name,
  price,
  qty,
  desc,
  isOpen,
  onClose,
}) => {
  const finalRef = React.useRef(null);
  const toast = useToast();
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);

  const CreateSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    file: Yup.mixed().required("Image is required"),
    price: Yup.number().required("Price is required"),
    quantity: Yup.number().required("Quantity is required"),
    description: Yup.string().required("Description is required"),
    CategoryId: Yup.string().required("Category is required"),
  });

  const handleSubmit = async (data) => {
    try {
      const { name, file, price, quantity, CategoryId, description } = data;
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({ name, price, quantity, CategoryId, description })
      );
      formData.append("file", file);
      const response = await Axios.patch(
        `http://localhost:8000/api/products/${ProductId}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setProduct(response.data.result);
      console.log(response.data.result);
      toast({
        title: "Product Created",
        description: "Your product has been edited.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      window.location.reload();
    } catch (err) {
      console.log(err.response);
      toast({
        title: "Error",
        description: "An error occurred while edited product.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getCategory = async (data) => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/api/categories/",
        data
      );
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
        quantity: "",
        description: "",
      }}
      validationSchema={CreateSchema}
      onSubmit={(values, actions) => {
        handleSubmit(values);
        actions.resetForm();
        onClose();
      }}
    >
      {(props) => (
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Product detail</ModalHeader>
            <ModalCloseButton />
            <Form>
              <ModalBody>
                <Box>
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
                      placeholder={name}
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
                      placeholder={price}
                      mb={4}
                      bgColor={"white"}
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
                      placeholder={qty}
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
                      placeholder={desc}
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
                <Button colorScheme="green" type="submit">
                  Accept
                </Button>
              </ModalFooter>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Formik>
  );
};
