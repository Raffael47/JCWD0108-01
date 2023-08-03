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
  Flex,
  Icon,
} from "@chakra-ui/react";
import * as Yup from "yup";
import Axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";

export const ModalEditCategory = ({
  id,
  name,
  icon,
  icons,
  color,
  colors,
  isOpen,
  onClose,
}) => {
  const finalRef = React.useRef(null);
  const toast = useToast();
  const [categories, setCategories] = useState([]);

  const CreateSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    icon: Yup.string().required("Icon is required"),
    color: Yup.string().required("Color is required"),
  });

  const handleSubmit = async (data) => {
    try {
      const { name, catIcon, color, quantity } = data;
      console.log(data);
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({ name, catIcon, color, quantity })
      );
      const response = await Axios.patch(
        `http://localhost:8000/api/categories/${id}`,
        data
      );
      setCategories(response.data.result);
      console.log(response.data.result);
      toast({
        title: "Product updated",
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
  return (
    <Formik
      initialValues={{
        name: name,
        icon: icon,
        color: color,
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
                      mb={4}
                      bgColor={"white"}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel textColor={"black"}>Color</FormLabel>
                    <Field as={Select} name="color">
                      {colors.map((v, i) => {
                        return <option key={i}>{v.color}</option>;
                      })}
                    </Field>
                    <ErrorMessage
                      component="div"
                      name="color"
                      style={{ color: "red" }}
                    />
                  </FormControl>

                  <FormLabel textColor={"black"}>Icon</FormLabel>
                  <Flex m={"10px 0px"}>
                    {icons.map((v, i) => {
                      return (
                        <Icon
                          flex={1}
                          as={v.catIcon}
                          color={
                            props.values.icon === v.value
                              ? props.values.color
                              : "black"
                          }
                          onClick={() => props.setFieldValue("icon", v.value)}
                        />
                      );
                    })}
                  </Flex>
                  <ErrorMessage
                    component="div"
                    name="icon"
                    style={{ color: "red" }}
                  />
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
