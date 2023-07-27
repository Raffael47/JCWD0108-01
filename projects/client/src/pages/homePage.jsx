import { Box, Flex } from "@chakra-ui/react";
import { CarouselMenu } from "../components/carouselMenu";
import { MenuCard } from "../components/menuCard";
import { Footer } from "../components/footer";

export const HomePage = () => {
    try {
        
    } catch (err) {
        console.log(err);
    }

    return (
        <Box 
            p={"1%"} 
            bgColor={"gray.300"}
            minH={"100vh"}
        >
            <CarouselMenu/>
            <Flex 
                direction={{base:"column",lg:"row"}}
                justifyContent={"center"}
                flexWrap="wrap"
            >
                <MenuCard/>
                <MenuCard/>
                <MenuCard/>
                <MenuCard/>
                <MenuCard/>
            </Flex>
            <Footer/>
        </Box>
    )
}
