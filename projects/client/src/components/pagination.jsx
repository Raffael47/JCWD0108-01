import { Flex, Icon, Text } from "@chakra-ui/react"
import { ButtomTemp } from "./button"
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'
import { useLocation, useSearchParams } from 'react-router-dom'

export const Pagination = ({ currentPage, totalPage }) => {

    const location = useLocation();
    // const searchParams = new URLSearchParams(location.search);
    const [ searchParams, setSearchParams ] = useSearchParams();

    // const params = searchParams.get('page')

    const handlePrev = () => {
        setSearchParams({'page': +currentPage - 1})
    }

    const handleNext = () => {
        setSearchParams({'page': +currentPage + 1})
    }

    console.log(searchParams.get('page'))
    console.log(currentPage)

    return (
        <Flex gap={3} alignItems={'center'} justifyContent={'center'}>
            {currentPage === 1 ? null :  (
            <ButtomTemp content={ <Icon as={FaArrowAltCircleLeft} w='5' h='5' /> } func={handlePrev} />
            ) }
            <Text fontWeight={'medium'} color={'white'}> Page {currentPage} of {totalPage} </Text>
            {currentPage === totalPage ? null : (
            <ButtomTemp content={ <Icon as={FaArrowAltCircleRight} w='5' h='5' /> } func={handleNext} />
            ) }
        </Flex>
    )
}