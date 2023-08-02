import { Box, Button, Flex, Icon, Input, Stack, Table, Td, Text, Th, Tr } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { sortDate } from "../../helper/date";
import { convertToRp } from "../../helper/rupiah";
import { CalendarButtonTemp } from "./calendar";
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi'
import { Pagination } from "../pagination";
import { Graphic } from "./graph";
import { useLocation } from "react-router-dom";
import { Error404 } from "../error404";
import { TransactionDetails } from "./details";
import { ButtomTemp } from "../button";

export const ReportTable = () => {
    
    const token = localStorage.getItem('token');
    const startDateRef = useRef();
    const endDateRef = useRef();

    const [ data, setData ] = useState({})
    const [ report, setReport ] = useState([]);

    const [ sort, setSort ] = useState(true);
    const [ orderBy, setOrderBy ] = useState('');

    const location = useLocation();
    const currentPage = new URLSearchParams(location.search).get('page'); 

    const handleReport = async() => {
        try {
            const startDate = startDateRef.current.value;
            const endDate = endDateRef.current.value;
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
    }, []);

    useEffect(() => {
        handleReport();
    }, [startDateRef.current, endDateRef.current, orderBy, currentPage, sort]);

    const handleOrderBy = (value) => {
        setOrderBy(value)
        setSort(!sort)
    }

    return (
        <Stack gap='30px'>
            <Flex gap={3} color={'white'} justifyContent={'end'} alignItems={'center'}>
                <Input type="datetime-local" size={'lg'} ref={startDateRef} />

                <Text fontWeight={'bold'} color={'white'} >to</Text>
                <Input type="datetime-local" size={'lg'} ref={endDateRef} />
            </Flex>
            <Graphic startDate={startDateRef.current} endDate={endDateRef.current} />
            <Box w='900px' border={'1px solid white'} bgColor="black" color="white">
                {data?.status ? (
                    <Table justifyContent={'center'} alignItems={'center'}>
                        <Tr borderColor={'white'}>
                        <Th onClick={() => handleOrderBy('id')} justifyContent={'center'} border={'1px solid white'} ># { orderBy === 'id' ? sort ? <Icon as={BiSolidDownArrow} color={'white'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'white'} w='3' h='3' /> : null } </Th>
                        <Th onClick={() => handleOrderBy('username')} justifyContent={'center'} border={'1px solid white'} >Cashier { orderBy === 'username' ? sort ? <Icon as={BiSolidDownArrow} color={'white'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'white'} w='3' h='3' /> : null }</Th>
                        <Th onClick={() => handleOrderBy('status')} justifyContent={'center'} border={'1px solid white'} >Status { orderBy === 'status' ? sort ? <Icon as={BiSolidDownArrow} color={'white'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'white'} w='3' h='3' /> : null }</Th>
                        <Th onClick={() => handleOrderBy('total')} justifyContent={'center'} border={'1px solid white'} >Total { orderBy === 'total' ? sort ? <Icon as={BiSolidDownArrow} color={'white'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'white'} w='3' h='3' /> : null }</Th>
                        <Th onClick={() => handleOrderBy('createdAt')} justifyContent={'center'} border={'1px solid white'} >Date { orderBy === 'createdAt' ? sort ? <Icon as={BiSolidDownArrow} color={'white'} w='3' h='3' /> : <Icon as={BiSolidUpArrow} color={'white'} w='3' h='3' /> : null }</Th>
                        </Tr>
                            {report.map(({ id, total, status, createdAt, Account }, index) => (
                            <Tr key={index} border={'1px solid white'} >
                                <Td border={'1px solid white'} > <TransactionDetails transactionId={ id } /> </Td>
                                <Td border={'1px solid white'} > {Account?.username} </Td>
                                <Td border={'1px solid white'} > {status} </Td>
                                <Td border={'1px solid white'} > {convertToRp(total)} </Td>
                                <Td border={'1px solid white'} > {sortDate(createdAt)} </Td>
                            </Tr>
                            ))} 
                    </Table> ) : (
                        <Error404/>
                )}
            </Box>

            {data?.status ? (
                <Pagination currentPage={data.currentPage} totalPage={data?.totalPage} />
            ) : null }
            
        </Stack>
    )
}