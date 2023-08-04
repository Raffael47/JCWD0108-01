import { Box, Center, Flex, Heading, Select, Stack } from '@chakra-ui/react'
import { ReportTable } from '../components/report/report'
import { Graphic } from '../components/report/graph'
import { CalendarButtonTemp } from '../components/report/calendar'
import { useSelector } from 'react-redux'
import { AdminOnly } from '../components/adminOnly'
import { SidebarButton } from '../components/sidebarDrawer'
import { SortBy } from '../components/report/sortByTime'

export const ReportPage = () => {
    const { isAdmin } = useSelector((state) => state.accountSlice.value)
    return (
        <>
        <Flex overflow={'hidden'} w={"100%"} bgColor={"black"} p={3} display={{base: 'block', lg:'none'}}>
            <SidebarButton/>
        </Flex>
        <Stack
        overflow={'hidden'}
        bgColor={'blackAlpha.900'}
        w='100%'
        h='100%'
        p='3rem'
        overflowY={'auto'}
        sx={
            { 
           '::-webkit-scrollbar':{
                  display:'none'
              }
           }
           }
        >
            <Heading size={'2xl'} color={'white'} mb='2rem'>
                Statistics
            </Heading>
            {isAdmin ? (
                <Stack
                justifyContent={'center'}
                alignItems={'center'}
                gap={5}
                >
                    <CalendarButtonTemp />
                    <SortBy/>
                    <Center>
                        <Flex w='800px' h='450px'>
                            <Graphic/>
                        </Flex>
                    </Center>
                        <ReportTable/>
                </Stack>
            ): (
                <Flex justifyContent={'center'} alignItems={'center'}>
                    <AdminOnly/>
                </Flex>
            )}
        </Stack>
        </>
    )
}