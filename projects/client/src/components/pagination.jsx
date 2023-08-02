import { Flex, Icon, Text } from "@chakra-ui/react"
import { ButtomTemp } from "./button"
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

export const Pagination = ({ totalPage }) => {

    // const location = useLocation();
    // // const searchParams = new URLSearchParams(location.search);
    // const [ searchParams, setSearchParams ] = useSearchParams();

    // // const params = searchParams.get('page')

    // const handlePrev = () => {
    //     setSearchParams({'page': +currentPage - 1})
    // }

    // const handleNext = () => {
    //     setSearchParams({'page': +currentPage + 1})
    // }

    // console.log(searchParams.get('page'))
    // console.log(currentPage)
    console.log(totalPage)

    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const currentPage = Number(queryParams.get("page")) || 1;

    function handlePageChange(newPage) {
        queryParams.set("page", newPage);
        navigate({ search: queryParams.toString() });
    }

    return (
        <Flex gap={3} alignItems={'center'} justifyContent={'center'}>
            <ButtomTemp 
            isDisabled= {currentPage === 1 ? true : false}
            content={ <Icon as={FaArrowAltCircleLeft} w='5' h='5' /> } 
            // func={handlePrev} 
            func={() => handlePageChange(currentPage - 1)}
            />
            <Text fontWeight={'medium'} color={'white'}> Page {currentPage} of {totalPage} </Text>
            <ButtomTemp 
            isDisabled= {currentPage === totalPage ? true : false}
            content={ <Icon as={FaArrowAltCircleRight} w='5' h='5' /> } 
            // func={handleNext} 
            func={() => handlePageChange(currentPage + 1)}
            />
        </Flex>
    )
}