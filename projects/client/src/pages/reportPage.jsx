import { Box, Center, Heading, Stack } from '@chakra-ui/react'
import { ReportTable } from '../components/report/report'
import { Graphic } from '../components/report/graph'

export const ReportPage = () => {
    return (
        <Stack
        bgColor={'#2d2d2d'}
        w='100%'
        h='100%'
        p='3rem'
        >
            <Heading size={'2xl'} color={'white'} mb='2rem'>
                Performance
            </Heading>
            <Stack
            justifyContent={'center'}
            alignItems={'center'}
            >
                <Center>
                <ReportTable/>

                </Center>
            </Stack>

        </Stack>
    )
}