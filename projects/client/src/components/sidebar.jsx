import { Avatar, Box, Flex, Heading, Icon, Input, List, ListIcon, ListItem, Menu, MenuButton, MenuIcon, MenuItem, MenuList, Stack, Text, useDisclosure, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Center } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { changeUrl } from "../redux/navigationSlice";
import { GrLogout } from 'react-icons/gr';
import { BsPerson } from 'react-icons/bs';
import { FaHamburger } from 'react-icons/fa';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage, Field } from 'formik'
import axios from "axios";

export const Sidebar = () => {
    const navigate = useNavigate();
    const { username, imgProfile } = useSelector((state) => state.accountSlice.value)
    const { currentUrl } = useSelector((state) => state.navigationSlice.value)
    const dispatch = useDispatch();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const token = localStorage.getItem('token');

    const handleNavigation = (value) => {
        dispatch(changeUrl({currentUrl: value}))
        navigate(value);
    }

    const profileSchema = Yup.object().shape({
        file: Yup.mixed()
        .required("Image is required")
        .test(
            "fileSize",
            "File size is too large",
            (value) => value === null || (value && value.size <= 10000000)
        )
    })

    const handleProfile = async(value) => {
        try {
            const { file } = value;
            const data = new FormData();
            data.append("file", file);

            await axios.post('http://localhost:8000/api/account/profile', data, {
                headers: {
                    authorization:`Bearer ${token}`
                },
                "Content-type": "multipart/form-data"
            });
            toast({
                title: 'Profile picture updated',
                status: 'error',
                isClosable: true,
                duration: 1500
            });
        } catch (err) {
            toast({
                title: 'Failed to upload your profile picture',
                status: 'error',
                isClosable: true,
                duration: 1500
            });
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login');
    }
    
    return (
        <>
        <Stack display={'flex'} p={4} w={'100%'} h={'100%'} bgColor={'black'} justifyContent={'space-between'}>
            <Stack gap={5} color={'whiteAlpha.700'}>
                <Flex w='100%' gap={3} justifyContent={'center'} alignItems={'center'}>
                    <Icon as={FaHamburger} w='5' h='5' />
                    <Heading fontSize={{base: '3xl', lg: '2xl'}}>ComfyPOS</Heading>
                </Flex>
                <List spacing={3}>
                    <ListItem cursor={'pointer'} onClick={() => handleNavigation('/')} p={2} borderRadius={'10px'} bgColor={currentUrl === '/' ? 'whiteAlpha.500' : null} color={currentUrl === '/' ? 'white' : null}>
                        Menu
                    </ListItem>
                    <ListItem cursor={'pointer'} onClick={() => handleNavigation('/statistics')} p={2} borderRadius={'10px'} bgColor={currentUrl === '/statistics' ? 'whiteAlpha.500' : null} color={currentUrl === '/statistics' ? 'white' : null}>
                        Statistic
                    </ListItem>
                    <ListItem cursor={'pointer'} onClick={() => handleNavigation('/cashiers')} p={2} borderRadius={'10px'} bgColor={currentUrl === '/cashiers' ? 'whiteAlpha.500' : null} color={currentUrl === '/cashiers' ? 'white' : null}>
                        Cashiers
                    </ListItem>
                </List>
            </Stack>
            <Menu>
                <MenuButton>
                    <Flex gap={4} alignItems={'center'} p={1} border={'2px solid'} borderColor={'whiteAlpha.700'} bgColor={'none'} borderRadius={'40px'} >
                        <Avatar 
                        name={username} 
                        src={`http://localhost:8000/avatar/${imgProfile}`}
                        size={'sm'}
                        />
                            <Text fontSize={'md'} color={'white'}>
                                {username}
                            </Text>
                    </Flex>
                </MenuButton>
                <MenuList alignItems={'center'}>
                    <MenuItem
                    gap={3}
                    alignSelf={'center'}
                    onClick={onOpen}
                    >
                        <Icon as={BsPerson} w='5' h='5' color={'black'} />
                        Change Profile Picture
                    </MenuItem>
                    <MenuItem
                    onClick={handleLogout}
                    gap={3}
                    alignSelf={'center'}
                    >
                        <Icon as={GrLogout} w='5' h='5' color={'red'} />
                        Log out
                    </MenuItem>
                </MenuList>
            </Menu>
        </Stack>
        <Modal
        isOpen={isOpen}
        onClose={onClose}
        colorScheme='red'
        >
        <ModalOverlay/>
            <ModalContent color={'white'} bgColor={'black'}>
                <ModalHeader fontSize={'2xl'}>Upload Profile Picture</ModalHeader>
                <ModalCloseButton />
                <Center>
                    <Avatar 
                    // name={username} 
                    src={`http://localhost:8000/avatar/${imgProfile}`}
                    size={'2xl'}
                    mb={3}
                    />
                </Center>
                    <Formik
                    initialValues={{file: ""}}
                    validationScheme={profileSchema}
                    onSubmit={(value) => {
                        handleProfile(value)
                    }}>
                        {({setFieldValue}) => {
                            return (
                                <Form>
                                    <ModalBody pb={6}>
                                    <Input
                                    variant="flushed"
                                    type="file"
                                    name="file"
                                    placeholder="Choose file"
                                    textAlign={'center'}
                                    onChange={(e) => {
                                    setFieldValue("file", e.target.files[0]);
                                    }}
                                    />
                                    <ErrorMessage
                                    component='div'
                                    name="file"
                                    style={{ color: "red", fontSize: "15px", marginTop: 3 }}
                                    />
                                    </ModalBody>
                            
                                    <ModalFooter w='100%' gap={'3'}>
                                        <Button w='50%' onClick={onClose}>Cancel</Button>
                                        <Button 
                                        w='50%' 
                                        type='submit' 
                                        colorScheme="teal"
                                        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                                        color={'white'}>
                                            Save
                                        </Button>
                                    </ModalFooter>
                                </Form>
                            )
                        }}
                    </Formik>
            </ModalContent>
        </Modal> 
        </>
    )
}