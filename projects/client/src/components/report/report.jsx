import { Box, Flex, Stack, Table, Td, Th, Tr } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { sortDate } from "../../helper/date";
import { convertToRp } from "../../helper/rupiah";
import Calendar from "react-calendar";

export const ReportTable = () => {

    const token = localStorage.getItem('token');
    const [ data, setData ] = useState([]);

    const handleReport = async(value) => {
        try {
            const startDate = value.startDate;
            const endDate = value.endDate;
            const orderBy = value.orderBy;
            const sort = value.sort;
            const user = value.user;
            const limit = value.limit;
            const page = value.page;
            const { data } = await axios.get(`http://localhost:8000/api/report?startDate=${startDate}&endDate=${endDate}&orderBy=${orderBy}&sort=${sort}&cashier=${user}&limit=${limit}&${page}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            console.log(data);
            setData(data.result);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleReport();
    }, []);



    return (
        <Stack gap='30px'>
            <Calendar/>
            <Box w='900px' bgColor="black" color="white">
                <Table justifyContent={'center'} borderColor={'white'}>
                    <Tr borderColor={'white'}>
                    <Th justifyContent={'center'} borderColor={'white'}>#</Th>
                    <Th justifyContent={'center'} borderColor={'white'}>Cashier</Th>
                    <Th justifyContent={'center'} borderColor={'white'}>Status</Th>
                    <Th justifyContent={'center'} borderColor={'white'}>Total</Th>
                    <Th justifyContent={'center'} borderColor={'white'}>Date</Th>
                    </Tr>
                    {data.map(({ id, total, status, createdAt, Account }, index) => (
                    <Tr key={index} borderColor={'white'}>
                        <Td borderColor={'white'}> {id} </Td>
                        <Td borderColor={'white'}> {Account?.username} </Td>
                        <Td borderColor={'white'}> {status} </Td>
                        <Td borderColor={'white'}> {convertToRp(total)} </Td>
                        <Td borderColor={'white'}> {sortDate(createdAt)} </Td>
                    </Tr>
                    ))}
                </Table>
            </Box>
            
        </Stack>
    )
}