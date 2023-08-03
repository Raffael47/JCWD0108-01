import { Box, Icon, Stack, Table, Td, Th, Tr } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { sortDate } from "../../helper/date";
import { convertToRp } from "../../helper/rupiah";
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi'
import { Pagination } from "../pagination";
import { useLocation } from "react-router-dom";
import { Error404 } from "../error404";
import { useSelector } from "react-redux";
import { TransactionDetails } from "./details";

export const ReportTable = () => {
    
    const token = localStorage.getItem('token');
    const { startDate, endDate, refresh } = useSelector((state) => state.reportSlice.value)

    const [ data, setData ] = useState({})
    const [ report, setReport ] = useState([]);

    const [ sort, setSort ] = useState(true);
    const [ orderBy, setOrderBy ] = useState('');

    const location = useLocation();
    const currentPage = new URLSearchParams(location.search).get('page'); 

    const handleReport = async() => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/report?startDate=${startDate}&endDate=${endDate}&orderBy=${orderBy}&sort=${sort ? 'ASC' : 'DESC'}&limit=6&page=${currentPage}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            console.log(data);
            setData(data)
            setReport(data.result);
        } catch (err) {
            console.log(err.response);
            const {data} = err.response
            setData(data)
        }
    };

    useEffect(() => {
        handleReport();
    }, [refresh, orderBy, currentPage, sort]);

    const handleOrderBy = (value) => {
        setOrderBy(value)
        setSort(!sort)
    }

    return (
        <Stack gap='30px'>
            {/* <Box w='900px' color="white"> */}
                {data?.status ? (
                    <Table overflowX={'auto'} size={{base: 'sm', md: 'md', lg: 'lg'}} color={'white'} variant={'striped'} colorScheme="teal" justifyContent={'center'} alignItems={'center'}>
                        <Tr bgColor={'blackAlpha.800'} borderColor={'white'}>
                        <Th w={'6'} onClick={() => handleOrderBy('id')} justifyContent={'center'} border={'1px solid white'} ># { orderBy === 'id' ? sort ? <Icon as={BiSolidDownArrow} color={'white'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'white'} w='3' h='3' /> : null } </Th>
                        <Th onClick={() => handleOrderBy('username')} justifyContent={'center'} border={'1px solid white'} >Cashier { orderBy === 'username' ? sort ? <Icon as={BiSolidDownArrow} color={'white'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'white'} w='3' h='3' /> : null }</Th>
                        <Th onClick={() => handleOrderBy('status')} justifyContent={'center'} border={'1px solid white'} >Status { orderBy === 'status' ? sort ? <Icon as={BiSolidDownArrow} color={'white'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'white'} w='3' h='3' /> : null }</Th>
                        <Th onClick={() => handleOrderBy('total')} justifyContent={'center'} border={'1px solid white'} >Total { orderBy === 'total' ? sort ? <Icon as={BiSolidDownArrow} color={'white'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'white'} w='3' h='3' /> : null }</Th>
                        <Th onClick={() => handleOrderBy('createdAt')} justifyContent={'center'} border={'1px solid white'} >Date { orderBy === 'createdAt' ? sort ? <Icon as={BiSolidDownArrow} color={'white'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'white'} w='3' h='3' /> : null }</Th>
                        </Tr>
                            {report.map(({ id, total, status, createdAt, Account }, index) => (
                            <Tr key={index} border={'1px solid white'} >
                                <Td border={'1px solid white'} > <TransactionDetails transactionId={id} /> </Td>
                                <Td border={'1px solid white'} > {Account?.username} </Td>
                                <Td border={'1px solid white'} > {status} </Td>
                                <Td border={'1px solid white'} > {convertToRp(total)} </Td>
                                <Td border={'1px solid white'} > {sortDate(createdAt)} </Td>
                            </Tr>
                            ))} 
                    </Table> ) : (
                        <Error404/>
                )}
            {/* </Box> */}

            {data?.status ? (
                <Pagination totalPage={data?.totalPage} />
            ) : null }
            
        </Stack>
    )
}