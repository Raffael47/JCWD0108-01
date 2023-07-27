import { Button } from "@chakra-ui/react";

export const ButtonTemp = (props) => {
    return (
        <Button
            colorScheme="blue"
            bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
            color="white"
            leftIcon={props.leftIcon}
            rightIcon={props.rightIcon}
            onClick={props.func}
            variant={props.variant}>
            {props.element}
        </Button>
    )
}