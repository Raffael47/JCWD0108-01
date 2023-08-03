import { Flex } from "@chakra-ui/react"
import { Search } from "./product/searchProduct"

export const Navbar = () => {
    return (
        <Flex w={"100%"} bgColor={"black"} p={3}>
            <Search/>
        </Flex>
    )
}