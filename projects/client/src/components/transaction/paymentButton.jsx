import { Button } from "@chakra-ui/react"

export const PaymentMethodButtonTemp = ({ content, id, onClick, active}) => {

    return (
        active === id ? 
        <Button
        variant={'solid'}
        color={'black'}
        alignItems={'center'}
        justifyContent={'center'}
        zIndex={'20'}
        w='70px'
        id={id}
        bgColor={'white'}
        onClick={onClick}
        _hover={{bgColor: 'pink'}}
        >
            {content}
        </Button> : 
        <Button
        variant={'outline'}
        color={'white'}
        alignItems={'center'}
        justifyContent={'center'}
        zIndex={'20'}
        w='70px'
        id={id}
        onClick={onClick}
        _hover={{color: 'black', bgColor: 'pink'}}
        >
            {content}
        </Button> 
    )
}

export const PlaceOrderButtonTemp = ({onClick}) => {
    return (
        <Button
        variant={'solid'}
        color={'black'}
        alignItems={'center'}
        justifyContent={'center'}
        zIndex={'20'}
        w='100%'
        bgColor={'white'}
        onClick={onClick}
        borderRadius={'20px'}
        _hover={{bgColor: 'pink'}}
        >
            Place Order
        </Button>
    )
}