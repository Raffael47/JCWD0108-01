import { Divider, Flex, Icon, Stack, Text, SlideFade, useDisclosure, Button, Slide, Box } from "@chakra-ui/react"
import { PaymentMethodButtonTemp, PlaceOrderButtonTemp } from "./paymentButton"
import { MdAttachMoney, MdQrCode } from "react-icons/md"
import { AiOutlineCreditCard } from "react-icons/ai"
import { useState } from "react"
import { OrderedProduct } from "./orderedProduct"

export const Receipt = () => {
    const { isOpen } = useDisclosure()

    const [active, setActive] = useState('');
    const handlePaymentType = (value) => {
        setActive(value)
        console.log(active)
    }

    return (
        <Stack  h='95vh'>
            {/* <Button onClick={onToggle}>Click</Button> */}
            <Flex
            direction={'column'}
            gap={'2'}
            w='100%'
            h={'auto'}
            pb='2'
            // minH={'25%'}
            // maxH={'100%'}
            overflowY={'auto'}
            // overflowY={data.length > 5 ? 'auto' : 'none'}
            sx={
                { 
               '::-webkit-scrollbar':{
                      display:'none'
                  }
               }
             }
            >
                {/* <OrderedProduct name={'Iced Coffee'} qty={5} price={'100000'}/> */}
                <OrderedProduct name={'Milk Tea'} qty={1} price={'18000'}/>
                <OrderedProduct name={'water'} qty={5} price={'20000'}/>
                <OrderedProduct name={'water'} qty={5} price={'20000'}/>
                <OrderedProduct name={'water'} qty={5} price={'20000'}/>
                {/* <OrderedProduct name={'water'} qty={5} price={'20000'}/> */}
                {/* <OrderedProduct name={'water'} qty={5} price={'20000'}/>
                <OrderedProduct name={'water'} qty={5} price={'20000'}/>
                <OrderedProduct name={'water'} qty={5} price={'20000'}/> */}
            </Flex>
            {/* <SlideFade in={isOpen} offsetX={'100%'} offsetY={0}>
            </SlideFade>
            <SlideFade in={isOpen} offsetX={'100%'} offsetY={0}>
            </SlideFade>
            <SlideFade in={isOpen} offsetX={'100%'} offsetY={0}>
            </SlideFade> */}
            <Stack
            w='100%'
            h='100%'
            minH='40%'
            bgColor='black'
            borderRadius={'10px'}
            // zIndex={'10'}
            padding={'18px'}
            justifyContent={'space-between'}
            >
                <Stack color={'white'}>
                    <Flex justifyContent={'space-between'} w={'100%'}>
                        <Text>Subtotal</Text>
                        <Text>100000</Text>
                    </Flex>
                    <Flex justifyContent={'space-between'} w={'100%'}>
                        <Text>Tax 10%</Text>
                        <Text>10000</Text>
                    </Flex>
                    <Divider variant={'dashed'}/>
                    <Flex justifyContent={'space-between'} w={'100%'}>
                        <Text>Total</Text>
                        <Text>110000</Text>
                    </Flex>
                </Stack>
                <Stack gap={'10px'}>
                    <Text color='lightgrey' fontSize={'sm'}>
                        Payment Method
                    </Text>
                    <Flex
                    w='100%'
                    justifyContent={'space-between'}
                    >
                        <Stack
                        alignItems={'center'} justifyContent={'center'} gap={'3px'}
                        >
                            <PaymentMethodButtonTemp id={'cash'} onClick={() => handlePaymentType('cash')} active={active} content={<Icon as={MdAttachMoney} h='5' w='5' />} />
                            <Text color='white' >
                                Cash
                            </Text>
                        </Stack>
                        <Stack
                        alignItems={'center'} justifyContent={'center'} gap={'3px'}
                        >
                            <PaymentMethodButtonTemp id={'debit'} onClick={() => handlePaymentType('debit')} active={active} content={<Icon as={AiOutlineCreditCard} h='5' w='5' />} />
                            <Text color='white' >
                                Debit
                            </Text>
                        </Stack>
                        <Stack
                        alignItems={'center'} justifyContent={'center'} gap={'3px'}
                        >
                            <PaymentMethodButtonTemp id={'E-Wallet'} onClick={() => handlePaymentType('E-Wallet')} active={active} content={<Icon as={MdQrCode} h='5' w='5' />} />
                            <Text color='white' >
                                E-Wallet
                            </Text>
                        </Stack>
                    </Flex>
                    <PlaceOrderButtonTemp />
                </Stack>

            </Stack>
        </Stack>
    )
}