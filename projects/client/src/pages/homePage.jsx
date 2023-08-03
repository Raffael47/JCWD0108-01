import { Grid, GridItem } from "@chakra-ui/react";
import { ProductCategory } from "../components/productCategory";
import { Navbar } from "../components/navBar";
import { Receipt } from "../components/transaction/receipt";

export const HomePage = () => {
  return (
    <Grid
      templateColumns="repeat(11, 1fr)"
      bgColor=""
      w="100%"
      h="100vh"
      overflowX={"hidden"}
    >
      <GridItem 
      overflowY={'auto'} 
      colSpan={{ base: 11, md: 8 }} 
      w="100%" 
      h={"100%"} 
      bg="#2d2d2d"
      sx={
        { 
       '::-webkit-scrollbar':{
              display:'none'
          }
       }
       }
      >
        <Navbar/>
        <ProductCategory />
      </GridItem>
      <GridItem
        display={{ base: "none", md: "block" }}
        colSpan={{ base: 0, md: 3 }}
        w="100%"
        h={"100%"}
        bg="#1d1d1d"
        p={2}
      >
        <Receipt />
      </GridItem>
    </Grid>
  );
};
