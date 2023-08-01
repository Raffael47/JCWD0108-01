import { Button, useColorModeValue } from '@chakra-ui/react'

export const ButtomTemp = ({content, func}) => {
  return (
        <Button
        px={8}
        bg={useColorModeValue('#151f21', 'gray.900')}
        color={'white'}
        rounded={'md'}
        _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
        }}
        onClick={func}
        >
        {content}
        </Button>
  )
}