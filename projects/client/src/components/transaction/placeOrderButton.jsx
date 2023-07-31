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
    Text
} from '@chakra-ui/react';
import { useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export const PlaceOrderButtonTemp = ({total, paymentType, token, active}) => {

    const paymentSchema = Yup.object().shape({
        payment: Yup.number().required('Please type in the total payment').min(total)
    })

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [paid, setPaid] = useState(false);

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
            console.log(total)
            console.log(value)
            await axios.patch('http://localhost:8000/api/transactions', value, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            toast({
                title: `Payment Succesful`,
                status: 'success',
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
            _hover={active ? {bgColor: 'red.200'} : null}
            isDisabled={active ? false : true}
            >
                {paid ? <Spinner/> : 'Place Order'}
            </Button>
            <Modal
            isOpen={isOpen}
            onClose={handleClose}
            colorScheme='red'
            >
            <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Finish Transaction</ModalHeader>
                    <ModalCloseButton />
                        <Formik
                        initialValues={{total: total, payment: 0}}
                        validationSchema={paymentSchema}
                        onSubmit= {(value, action) => {
                            handleFinish(value)
                            action.resetForm()
                        }}>
                            {() => {
                                return (
                                    <Form>
                                        <ModalBody pb={6}>
                                            <Text>Payment Method: {paymentType}</Text>
                                            <FormControl>
                                            <FormLabel htmlFor='payment'>Payment</FormLabel>
                                            <Input as={Field} name='payment' type='number' />
                                            <ErrorMessage component='div' name='payment' style={{color: 'red'}} />
                                            </FormControl>
                                        </ModalBody>
                                
                                        <ModalFooter>
                                            <Button type='submit' colorScheme='pink' mr={3}>
                                                Confirm Payment
                                            </Button>
                                            <Button onClick={handleClose}>Cancel</Button>
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