import { Button } from "@chakra-ui/react";

export const PaymentMethodButtonTemp = ({ content, id, onClick, active, isDisabled }) => {

    return (
        active === id ? 
        <Button
        variant={isDisabled ? 'solid' : 'outline'}
        color={ isDisabled ? 'black' : 'white' }
        alignItems={'center'}
        justifyContent={'center'}
        zIndex={'20'}
        w='70px'
        id={id}
        bgColor={ isDisabled ? 'white' : null }
        onClick={onClick}
        isDisabled={isDisabled ? false : true}
        _hover={ isDisabled ? {bgColor: 'red.200'} : null }
        cursor={'pointer'}
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
        isDisabled={isDisabled ? false : true}
        _hover={ isDisabled ? {color: 'black', bgColor: 'red.200'} : null}
        >
            {content}
        </Button> 
    )
}