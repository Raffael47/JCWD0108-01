import { Box } from "@chakra-ui/react"
import { DetailProducts } from "../components/detailProducts"

export const DetailProduct = () => {
    return (
        <Box
        p={"1%"} 
        bgColor={"gray.300"}
        minH={"100vh"}
        >
            <DetailProducts/>
        </Box>
    )
}