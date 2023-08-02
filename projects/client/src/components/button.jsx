import { Button, useColorModeValue } from '@chakra-ui/react'

export const ButtomTemp = ({content, func, isDisabled=false}) => {
  return (
        <Button
        colorScheme="whiteAlpha"
        bgGradient="linear(to-r, blackAlpha.400, blackAlpha.500, blackAlpha.600)"
        color={'white'}
        isDisabled={isDisabled}
        onClick={func}
        >
        {content}
        </Button>
  )
}