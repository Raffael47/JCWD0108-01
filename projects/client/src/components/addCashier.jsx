import Axios from 'axios';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button, Input, FormControl, FormLabel, useToast, Flex, Box, } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export default function AddCashier() {
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const toast = useToast();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState();
    const [show, setShow] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleClick = () => setShow(!show);
    const Formschema = Yup.object().shape(({
        username: Yup.string()
            .required('Username is required')
            .matches(/^(\S+$)/g, 'This field cannot contain blankspaces'),
        email: Yup.string()
            .email('Invalid email addres format')
            .required('E-mail is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password minimum 6 characters long')
            .matches(/^(?=.*[A-Z])/, 'Password Must Contain 1 Capital')
            .matches(/^(?=.*(\W|_))/, 'Password Must Contain 1 Symbol')
            .matches(/.*[0-9].*/, 'Password Must Contain 1 number'),
    }));
    const handleCreate = async (value) => {
        try {
            const data = new FormData();
            const { username, email, password } = value;
            data.append('username', { username }.username);
            data.append('email', { email }.email);
            data.append('password', { password }.password);
            data.append('avatar', file);
            await Axios.post('http://localhost:8000/api/auth/', data, {
                headers: { Authorization: `Bearer ${token}` },
                'content-Type': 'Multiple/form-data'
            });
            setSuccess(true);
            toast({
                title: 'New Cashier!',
                description: 'Successfully added a new cashier!',
                status: 'success',
                duration: 1500,
                isClosable: true,
                position: 'top'
            });
            setTimeout(() => {
                window.location.reload();
                navigate('/cashiers');
            }, 1000);
        } catch (err) {
            console.log(err);
            toast({
                title: 'Access Denied!',
                description: err.response.data.error.message,
                status: 'error',
                duration: 2500,
                isClosable: true,
                position: 'top'
            });
        }
    }
    return (
        <>
            <Button boxShadow={'0px 0px 5px grey'} bg='#676767' color='#ffffff' colorScheme='blue' w={{ base: '200px', md: '200px', lg: '200px' }} onClick={onOpen}>Add a new Cashier</Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg='#676767' color='#ffffff' fontFamily='Inter'>Create a New Cashier Account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Formik
                            initialValues={{ username: '', email: '', password: '', avatar: null }}
                            validationSchema={Formschema}
                            onSubmit={(value, action) => {
                                console.log(value);
                                handleCreate(value);
                                if (success) action.resetForm();
                            }}>
                            {() => {
                                return (
                                    <Form>
                                        <FormControl>
                                            <FormLabel fontFamily='Inter'>Username</FormLabel>
                                            <Field as={Input} fontFamily='Inter' ref={initialRef} name='username' borderBottom={'1px solid'} borderColor='#292C2D' />
                                            <ErrorMessage component='Box' name='username' style={{ color: 'red', marginBottom: '-20px', marginLeft: '3px', marginTop: '-9px' }} />
                                        </FormControl>
                                        <FormControl mt={4}>
                                            <FormLabel fontFamily='Inter'>Email</FormLabel>
                                            <Field as={Input} fontFamily='Inter' name='email' borderBottom={'1px solid'} borderColor='#292C2D' />
                                            <ErrorMessage component='Box' name='email' style={{ color: 'red', marginBottom: '-20px', marginLeft: '3px', marginTop: '-9px' }} />
                                        </FormControl>
                                        <FormControl mt={4}>
                                            <FormLabel fontFamily='Inter'>Password</FormLabel>
                                            <Flex>
                                                <Box>
                                                    <Field as={Input} fontFamily='Inter' name='password' w={{ base: '180px', md: '400px', lg: '400px' }} size={'md'} type={show ? 'text' : 'password'} color={'black'} borderBottom={'1px solid'} borderColor='#292C2D' />
                                                    <ErrorMessage
                                                        component='box'
                                                        name='password'
                                                        style={{ color: 'red', marginBottom: '-18px', marginTop: '-8px' }} />
                                                </Box>
                                                <Button right={'30px'} variant={'unstyled'} size='sm' onClick={handleClick}>
                                                    {show ? <ViewIcon /> : <ViewOffIcon />}
                                                </Button>
                                            </Flex>
                                        </FormControl>
                                        <Field name='avatar'>
                                            {({ field }) => (
                                                <FormControl mt={4}>
                                                    <FormLabel>Photo Profile</FormLabel>
                                                    <Input mb={'10px'}  {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setFile(e.target.files[0]);
                                                        }} variant={'flushed'} borderBottom={'1px solid'} borderColor='#292C2D' placeholder='Photo' name='avatar' as={Field} type='file' />
                                                    <ErrorMessage component='Box' name='avatar' style={{ color: 'red', marginBottom: '-20px', marginLeft: '3px', marginTop: '-9px' }} />
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Button type='submit' bg='#676767' color='#ffffff' colorScheme='blue' mr={3}>  Add Cashier  </Button>
                                        <Button onClick={onClose}>Cancel</Button>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}