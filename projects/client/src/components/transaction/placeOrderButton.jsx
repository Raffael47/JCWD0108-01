import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    useToast,
    Button,
    FormControl,
    FormLabel,
    Input,
    Spinner,
    Text,
    InputGroup,
    InputLeftAddon
} from '@chakra-ui/react';
import { useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { convertToRp } from '../../helper/rupiah';
import { useDispatch } from 'react-redux';
import { refreshCart } from '../../redux/cartSlice';

export const PlaceOrderButtonTemp = ({total, paymentType, token, active, isDisabled}) => {

    const paymentSchema = Yup.object().shape({
        payment: Yup.number().required('Please type in the total payment').min(total)
    })

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [paid, setPaid] = useState(false);
    const dispatch = useDispatch();

    const handleOpen = () => {
        setPaid(true)
        onOpen()
    };
    const handleClose = () => {
        setPaid(false)
        onClose()
    };

    const handleFinish = async(value) => {
        try {
            value.change = value.payment - value.total
            await axios.patch('http://localhost:8000/api/transactions', value, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            setPaid(true)
            dispatch(refreshCart())
            toast({
                title: `Payment Succesful`,
                status: 'success',
                description: `Your change is ${convertToRp(value.change)}`,
                isClosable: true
            });
        } catch (err) {
            console.log(err);
            toast({
                title: `Transaction failed`,
                status: 'error',
                isClosable: true
            });
        }
    }
    
    return (
        <>
            <Button
            variant={'solid'}
            color={'black'}
            alignItems={'center'}
            justifyContent={'center'}
            zIndex={'20'}
            w='100%'
            bgColor={'white'}
            onClick={handleOpen}
            borderRadius={'20px'}
            _hover={isDisabled ? {bgColor: 'red.200'} : null}
            isDisabled={isDisabled ? false : true}
            >
                {paid ? <Spinner/> : 'Place Order'}
            </Button>
            <Modal
            isOpen={isOpen}
            onClose={handleClose}
            colorScheme='red'
            >
            <ModalOverlay/>
                <ModalContent color={'white'} bgColor={'black'}>
                    <ModalHeader fontSize={'28px'}>Finish Transaction</ModalHeader>
                    <ModalCloseButton />
                        <Formik
                        initialValues={{total: total, payment: 0}}
                        validationSchema={paymentSchema}
                        onSubmit= {(value, action) => {
                            handleFinish(value)
                            action.resetForm()
                            onClose()
                        }}>
                            {() => {
                                return (
                                    <Form>
                                        <ModalBody pb={6}>
                                        <Text fontWeight={'medium'} fontSize="18px" mt={3} mb={2}>
                                            Payment Method
                                        </Text>
                                        <Text color={'gray.500'} mb={6}>
                                            {paymentType}
                                        </Text>
                                            <FormControl>
                                            <FormLabel htmlFor='payment'>Amount</FormLabel>
                                            <InputGroup gap={5} variant='unstyled'>
                                            <InputLeftAddon children='Rp.' />
                                            <Input as={Field} name='payment' type='number' variant='flushed' />
                                            </InputGroup>
                                            <ErrorMessage component='div' name='payment' style={{color: 'red'}} />
                                            </FormControl>
                                        </ModalBody>
                                
                                        <ModalFooter w='100%' gap={'3'}>
                                            <Button w='50%' onClick={handleClose}>Cancel</Button>
                                            <Button 
                                            w='50%' 
                                            type='submit' 
                                            colorScheme="teal"
                                            bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                                            color={'white'}>
                                                Confirm Payment
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