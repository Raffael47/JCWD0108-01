import { Flex } from "@chakra-ui/react"
import { Search } from "./product/searchProduct"
import { SidebarButton } from "./sidebarDrawer"

export const Navbar = () => {
    return (
        <Flex w={"100%"} bgColor={"black"} p={3} gap={3}>
            <SidebarButton/>
            <Search/>
        </Flex>
    )
}