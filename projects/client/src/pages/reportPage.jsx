import { Box, Center } from '@chakra-ui/react'
import { ReportTable } from '../components/report/report'

export const ReportPage = () => {
    return (
        <Box
        bgColor={'green.200'}
        w='100%'
        h='100%'
        justifyContent={'center'}
        alignItems={'center'}
        >
            <Center>
            <ReportTable/>

            </Center>
        </Box>
    )
}