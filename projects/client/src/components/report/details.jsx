import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading, Icon, Image, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios"
import { useEffect, useState } from "react";
import { ButtomTemp } from "../button";
import { BsCheckCircle, BsExclamationCircle } from "react-icons/bs";
import { convertToRp } from "../../helper/rupiah";
import { sortDate } from "../../helper/date";

export const TransactionDetails = ({transactionId}) => {
    const token = localStorage.getItem('token')
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [ details, setDetails ] = useState([]);
    const [ info, setInfo ] = useState({});
    const [ refresh, setRefresh ] = useState(false)
    const toast = useToast();

    const handleDetails = async() => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/report/details/${transactionId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setDetails(data.result);
            setInfo(data.tsInfo);
        } catch (err) {
            console.log(err)
            toast({
                title: 'Failed to fetch data',
                description: 'Please try again later',
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }
    }

    const handleOpen = () => {
        onOpen();
        setRefresh(!refresh)
    }

    useEffect(() => {
        handleDetails()
    }, [refresh])

    const { Account, total, payment, createdAt, status } = info;

    return (
        <>
        <ButtomTemp content={transactionId} func={handleOpen} />
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            size={{base: 'xs', md: 'md'}}
        >
            <DrawerOverlay />
            <DrawerContent bgColor={'gray.900'} color={'white'}>
            <DrawerCloseButton />
            <DrawerHeader justify={'center'} align={'center'} >
                <Icon as={ status === 'PAID' ? BsCheckCircle : BsExclamationCircle} color={ status === 'PAID' ? 'green.400' : 'yellow.400' } w='12' h='12' />
                <Text fontSize={'md'} mb='2' fontWeight={'medium'} color={'gray.400'} > Transaction amount </Text>
                <Heading fontWeight={'semibold'}> { status === 'PAID' ? convertToRp(total) : '-'} </Heading>
            </DrawerHeader>

            <DrawerBody overflowY={'hidden'}>
                <Flex gap={{base: 2, md: 4}} w='100%' justifyContent={'space-around'}>
                    <Stack gap={3}>
                        <Box>
                            <Text fontSize={{base: 'xs', md: 'lg', lg: 'xs'}} fontWeight={'medium'} color={'gray.400'} > STATUS </Text>
                            <Text fontSize={{base: 'md', md: 'xl', lg: 'md'}} fontWeight={'semibold'} color={ status === 'PAID' ? 'green.400' : 'yellow.400' } > { status === 'PAID' ? 'Completed' : 'Ongoing' } </Text>
                        </Box>
                        <Box>
                            <Text fontSize={{base: 'xs', md: 'lg', lg: 'xs'}} fontWeight={'medium'} color={'gray.400'} > TRANSACTION DATE </Text>
                            <Text fontSize={{base: 'md', md: 'xl', lg: 'md'}} fontWeight={'semibold'} color={'white'} > {sortDate(createdAt)} </Text>
                        </Box>
                    </Stack>
                    <Stack gap={3}>
                        <Box>
                            <Text fontSize={{base: 'xs', md: 'lg', lg: 'xs'}} fontWeight={'medium'} color={'gray.400'} > CASHIER </Text>
                            <Text fontSize={{base: 'md', md: 'xl', lg: 'md'}} fontWeight={'semibold'} color={'white'} > {Account?.username} </Text>
                        </Box>
                        <Box>
                            <Text fontSize={{base: 'xs', md: 'lg', lg: 'xs'}} fontWeight={'medium'} color={'gray.400'} > PAYMENT AMOUNT </Text>
                            <Text fontSize={{base: 'md', md: 'xl', lg: 'md'}} fontWeight={'semibold'} color={'white'} > { status === 'PAID' ? convertToRp(payment) : '-'} </Text>
                        </Box>
                    </Stack>
                </Flex>
                <Stack
                mt={5}
                w='100%'
                h='2xs'
                overflowY={'auto'}
                sx={
                    { 
                   '::-webkit-scrollbar':{
                          display:'none'
                      }
                   }
                 }
                >
                    {details.map(({ Product, quantity }) => {
                        return (
                            <Flex justifyContent={'space-between'} borderRadius={'10px'} border={'2px solid gray'} p={{base: 2, md: 4}} alignItems={'center'} >
                                <Flex gap={{base: 2, md: 4}} alignItems={'center'}>
                                    <Box
                                    bg={Product?.Category?.color}
                                    border='1px solid white'
                                    borderRadius='10px'
                                    boxShadow={'2xl'}
                                    pos={'relative'}>
                                        <Image 
                                        src={`http://localhost:8000/${Product?.image}`} 
                                        alt={`${Product?.name} image`}
                                        boxSize={{base: '60px', md: '80px'}}
                                        justifyContent={'center'}
                                        /> 
                                    </Box>
                                    <Stack gap={0}>
                                        <Text pb={'0'} fontSize={{base: 'lg', md: '3xl'}} mb='0' fontWeight={'medium'} color={'white'} > {Product?.name} </Text>
                                        <Text fontSize={{base: 'sm', md: 'lg'}}  fontWeight={'normal'} color={Product?.Category?.color} > {Product?.Category?.name} </Text>
                                    </Stack>
                                    <Stack>
                                        <Text pb={'0'} fontSize={{base: 'md', md: 'xl'}} mb='0' fontWeight={'normal'} color={'gray.500'} > x{quantity} </Text>
                                    </Stack>
                                </Flex>
                                <Stack>
                                    <Text pb={'0'} fontSize={{base: 'md', md: 'xl'}} mb='0' fontWeight={'normal'} color={'white'} > {convertToRp(Product?.price)} </Text>
                                </Stack>
                            </Flex>
                        )
                    })}
                </Stack>
            </DrawerBody>
            </DrawerContent>
        </Drawer>
        </>
    )
}