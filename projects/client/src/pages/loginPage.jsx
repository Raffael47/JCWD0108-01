import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
    Button,
    Checkbox,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
    useToast
  } from '@chakra-ui/react'
  import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setValue } from "../redux/userSlice";
import { NavLink } from "react-router-dom";
  
  export function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
  
    const loginSchema = Yup.object().shape({
      username: Yup.string().required("Username is required"),
      password: Yup.string()
      .required("Password is required")
      .min(6, "Password to short")
      .matches(/^(?=.*[A-Z])/, "Password must contain min. 1 Capital")
      .matches(/^(?=.*(\W|_))/, "Password must contain min. 1 symbol")
      .matches(/.*[0-9].*/, "Password must contain min. 1 number"),
    });
    
      const handleSubmit = async (data) => {
        try {
          const response = await Axios.post(
            `http://localhost:8000/api/auth/`,
            data
          );
          console.log(response.data);
          dispatch(setValue(response.data.account));
          localStorage.setItem("token", response.data.token);
    
          toast({
            title: "Congratulation",
            description: "You have successfully logged in!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
    
          navigate("/");
        } catch (error) {
          console.log(error);
    
          toast({
            title: "Sorry",
            description: "Login failed, please check again later!",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      };
    
    return (
    <Box>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(value, action) => {
          handleSubmit(value);
          navigate("/");
        }}
      >
      {(props) => {
        return (
          <Stack minH={'100vh'} bgColor="#111315" direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
              <Stack spacing={4} w={'full'} maxW={'md'}>
                <Heading fontFamily="Inter" fontSize={'2xl'} color="#ffffff">Welcome Back , Buddy !</Heading>
                <Text mb='36px' ms='4px' color="#ffffff" fontWeight='bold' fontSize='14px' fontFamily="Inter"> Enter your Username and Password to sign </Text>
                <Form>
                  <Field name="username">
                    {({ field }) => (
                      <FormControl id="username" color="#ffffff" fontFamily="Inter">
                        <FormLabel htmlFor="username" color="#ffffff" fontFamily="Inter">Username</FormLabel>
                        <Input {...field} type="text" id="username" bgColor="#292C2D" />
                      </FormControl>
                    )}
                  </Field>
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="username"
                    component="div"
                  />
                  <Field name="password">
                    {({ field }) => {
                      return (
                        <FormControl id="password" color="#ffffff">
                          <FormLabel htmlFor="password"color="#ffffff" fontFamily="Inter">Password</FormLabel>
                          <InputGroup>
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              id="password"
                              bgColor="#292C2D"
                            />
                            <InputRightElement h={"full"}>
                              <Button
                                variant={"ghost"}
                                onClick={() =>
                                  setShowPassword(
                                    (showPassword) => !showPassword
                                  )
                                }
                              >
                                {showPassword ? (
                                  <ViewIcon />
                                ) : (
                                  <ViewOffIcon />
                                )}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                        </FormControl>
                      );
                    }}
                  </Field>
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="password"
                    component="div"
                  />
                    <Stack spacing={6}>
                      <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}>
                        <Checkbox color="#ffffff" fontFamily="Inter">Remember me</Checkbox>
                        <Text color="red.300" fontFamily="Inter">Forgot password?
                            <Link to="/forgot">
                                <Text _hover={{ color: "blue" }} color={"red"}> Click here</Text>
                            </Link>
                        </Text>
                      </Stack>
                      <Button colorScheme={'blue'} variant={'solid'} fontFamily="Inter">
                        Sign in
                      </Button>
                    </Stack>
                </Form>
              </Stack>
            </Flex>
            <Flex flex={1}>
              <Image
                alt={'Login Image'}
                objectFit={'cover'}
                src={
                  'https://media.istockphoto.com/id/1144300316/vector/fast-food-neon-banner-vector-template-glowing-night-bright-lettering-sign-for-fast-food-cafe.jpg?s=170667a&w=0&k=20&c=t3p7pnWx8TohZ8fl4nHAzHqnJ0tYhfbpog1qY7HiwI4='
                }
              />
            </Flex>
          </Stack>
    );
  }}
</Formik>
</Box>

  );
}