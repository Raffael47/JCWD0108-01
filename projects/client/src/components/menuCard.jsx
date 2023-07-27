'use client'

import { useState } from 'react'
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react'
import { BsArrowUpRight, BsFillCartCheckFill, BsFillCartPlusFill } from 'react-icons/bs'
import { ButtonTemp } from './button'

export const MenuCard = (props) => {
  const [cart, setCart] = useState(false)

  return (
    <Center py={6}>
      <Box
        w="xs"
        rounded={'sm'}
        my={5}
        mx={[0, 5]}
        overflow={'hidden'}
        bg="white"
        border={'1px'}
        borderColor="black"
        boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 cyan')}>
        <Box h={'200px'} borderBottom={'1px'} borderColor="black">
          <Img
            src={
                'https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080'
            }
            // src={props.image}
            roundedTop={'sm'}
            objectFit="cover"
            h="full"
            w="full"
            alt={'Blog Image'}
          />
        </Box>
        <Box p={4}>
          <Box bg="black" display={'inline-block'} px={2} py={1} color="white" mb={2}>
            <Text fontSize={'xs'} fontWeight="medium">
              Category Fastfood
              {/* {props.category} */}
            </Text>
          </Box>
          <Heading color={'black'} fontSize={'2xl'} noOfLines={1}>
            Fastfood name
            {/* {props.name} */}
          </Heading>
          <Text color={'gray.500'} noOfLines={2}>
            In this post, we will give an overview of what is new in React 18, and what it
            means for the future.
            {/* {props.desc} */}
          </Text>
        </Box>
        <HStack borderTop={'1px'} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={'center'}
            roundedBottom={'sm'}
            cursor={'pointer'}
            w="full">
            <Text fontSize={'xl'} fontWeight={'semibold'}>
              Price
              {/* {props.price} */}
            </Text>
          </Flex>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={'center'}
            gap='4'
            roundedBottom={'sm'}
            borderLeft={'1px'}
            cursor="pointer">
            <ButtonTemp element={'-'} variant={'Outline'} />
            <Text fontSize={'xl'} fontWeight={'semibold'}>
              3
              {/* {props.totalItems} */}
            </Text>
            <ButtonTemp element={'+'} variant={'Outline'} />
          </Flex>
        </HStack>
      </Box>

    </Center>
  )
}