import { Divider, Flex, Icon, Stack, Text, SlideFade, useDisclosure, Button, Slide, Box } from "@chakra-ui/react"
import { PaymentMethodButtonTemp } from "./paymentTypeButton"
import { MdAttachMoney, MdQrCode } from "react-icons/md"
import { AiOutlineCreditCard } from "react-icons/ai"
import { useEffect, useState } from "react"
import { OrderedProduct } from "./orderedProduct"
import axios from 'axios'
import { PlaceOrderButtonTemp } from "./placeOrderButton"
import { convertToRp } from "../../helper/rupiah"
import { useSelector } from "react-redux"

export const Receipt = () => {
    const [receipt, setReceipt] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const token = localStorage.getItem('token')
    const { refresh } = useSelector((state) => state.cartSlice.value)

    const handleReceipt = async() => {
        try {
            const {data} = await axios.get('http://localhost:8000/api/transactions', {
                headers: {
                    authorization: `Bearer: ${token}`
                }
            });
            setReceipt(data.cart);
            setTotalPrice(data.subtotal[0].subtotal);
        } catch (err) {
            setReceipt([])
            console.log(err);
        }
    }

    console.log(refresh)

    const [active, setActive] = useState('');
    const handlePaymentType = (value) => {
        setActive(value)
    };

    useEffect(() => {
        handleReceipt()
    }, [refresh]);

    useEffect(() => {
        handleReceipt()
    }, [receipt]);

    return (
        <Stack  h='95vh'>
            <Flex
            direction={'column'}
            gap={'2'}
            w='100%'
            h={'auto'}
            pb='2'
            overflowY={receipt.length > 5 ? 'auto' : 'none'}
            sx={
                { 
               '::-webkit-scrollbar':{
                      display:'none'
                  }
               }
             }
            >
                {receipt.map(({ Product, quantity, ProductId }) => {
                    return (
                        <OrderedProduct name={Product?.name} qty={quantity} price={ Product?.price * quantity } ProductId={ProductId} />
                    )
                })}
            </Flex>
            <Stack
            w='100%'
            h='100%'
            minH='40%'
            bgColor='black'
            borderRadius={'10px'}
            padding={'18px'}
            justifyContent={'space-between'}
            >
                <Stack color={ receipt.length > 0 ? 'white' : '#2d2d2d' }>
                    <Flex justifyContent={'space-between'} w={'100%'}>
                        <Text>Subtotal</Text>
                        <Text>{convertToRp(+totalPrice)}</Text>
                    </Flex>
                    <Flex justifyContent={'space-between'} w={'100%'}>
                        <Text>Tax 10%</Text>
                        <Text>{convertToRp(totalPrice * 10 / 100)}</Text>
                    </Flex>
                    <Divider variant={'dashed'}/>
                    <Flex justifyContent={'space-between'} w={'100%'}>
                        <Text>Total</Text>
                        <Text>{convertToRp(+totalPrice + (totalPrice * 10 / 100))}</Text>
                    </Flex>
                </Stack>
                <Stack gap={'10px'}>
                    <Text color={ receipt.length > 0 ? 'white' : '#2d2d2d' } fontSize={'sm'}>
                        Payment Method
                    </Text>
                    <Flex
                    w='100%'
                    justifyContent={'space-between'}
                    >
                        <Stack
                        alignItems={'center'} justifyContent={'center'} gap={'3px'}
                        >
                            <PaymentMethodButtonTemp isDisabled={receipt.length > 0 ? true : false} id={'Cash'} onClick={() => handlePaymentType('Cash')} active={active} content={<Icon as={MdAttachMoney} h='5' w='5' />} />
                            <Text color={ receipt.length > 0 ? 'white' : '#2d2d2d' } >
                                Cash
                            </Text>
                        </Stack>
                        <Stack
                        alignItems={'center'} justifyContent={'center'} gap={'3px'}
                        >
                            <PaymentMethodButtonTemp isDisabled={receipt.length > 0 ? true : false} id={'Debit'} onClick={() => handlePaymentType('Debit')} active={active} content={<Icon as={AiOutlineCreditCard} h='5' w='5' />} />
                            <Text color={ receipt.length > 0 ? 'white' : '#2d2d2d' } >
                                Debit
                            </Text>
                        </Stack>
                        <Stack
                        alignItems={'center'} justifyContent={'center'} gap={'3px'}
                        >
                            <PaymentMethodButtonTemp isDisabled={receipt.length > 0 ? true : false} id={'E-Wallet'} onClick={() => handlePaymentType('E-Wallet')} active={active} content={<Icon as={MdQrCode} h='5' w='5' />} />
                            <Text color={ receipt.length > 0 ? 'white' : '#2d2d2d' } >
                                E-Wallet
                            </Text>
                        </Stack>
                    </Flex>
                    <PlaceOrderButtonTemp total={+totalPrice + (totalPrice * 10 / 100)} paymentType={active} token={token} active={active} />
                </Stack>

            </Stack>
        </Stack>
    )
}