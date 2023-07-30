import { ButtonGroup, Icon, Button, Flex, Text, useDisclosure, Box, transition } from "@chakra-ui/react"
import { useState } from "react"
import { FaTrash } from "react-icons/fa"

export const OrderedProduct = ({name, qty, price}) => {
    const [active, setActive] = useState(false);
    const { isOpen, onToggle, onOpen, onClose } = useDisclosure();
    const handleClick = () => {setActive(!active)};
    // const handleOpen = () => {
    //     transition = 'width 2s'
    // }
    return (
        active ? 
        <ButtonGroup isAttached={true}>
            <Button bgColor={'gray'} color={'red'} _hover={{bgColor: 'red', color: 'white'}} > <Icon as={FaTrash} h={'w'} w={'5'}/> </Button>
            <Button _hover={{bgColor: 'pink', color: 'black'}} onClick={handleClick} w={'100%'} bgColor={'black'} color={'white'}>
                <Flex justifyContent={'space-between'} w={'100%'}>
                    <Flex gap={'1rem'}><Text>{name}</Text><Text>x{qty}</Text></Flex>
                    <Text>{price}</Text>
                </Flex>
            </Button>
        </ButtonGroup> :
        <ButtonGroup>
            <Button _hover={{bgColor: 'pink', color: 'black'}} w={'100%'} bgColor={'black'} color={'white'}>
                <Flex justifyContent={'space-between'} w={'100%'} onClick={handleClick}>
                    <Flex gap={'1rem'}><Text>{name}</Text><Text>x{qty}</Text></Flex>
                    <Text>{price}</Text>
                </Flex>
            </Button>
        </ButtonGroup>
        // <Box>
        //     <Box position={'relative'}>
        //         <Button 
        //         bgColor={'gray'} 
        //         color={'red'} 
        //         _hover={{bgColor: 'red', color: 'white'}} 
        //         zIndex={'10'}
        //         position={'absolute'}
        //         // position={'sticky'}
        //         >
        //             <Icon as={FaTrash} h={'w'} w={'5'}/> 
        //         </Button>

        //         <Button 
        //         _hover={{bgColor: 'pink', color: 'black'}} 
        //         onClick={onOpen} 
        //         w={'100%'} 
        //         bgColor={'black'} 
        //         color={'white'}
        //         zIndex={'30'}
        //         position={'absolute'}
        //         >
        //             <Flex justifyContent={'space-between'} w={'100%'}>
        //                 <Flex gap={'15px'}><Text>{name}</Text><Text>x{qty}</Text></Flex>
        //                 <Text>{price}</Text>
        //             </Flex>
        //         </Button>
        //     </Box>
        // </Box>
    )
}