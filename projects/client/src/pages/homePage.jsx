import { Grid, GridItem } from '@chakra-ui/react'
import { ProductCategory } from '../components/productCategory'

export const HomePage = () => {
    return (
    <Grid templateColumns='2fr 8fr 3fr' bgColor='' w='100vw' h='100vh' overflowX={'hidden'}>
    <GridItem colSpan={1} w='100%' h={'100%'} bg='red.500'>
        {/* navbar */}
    </GridItem>
    <GridItem colSpan={1} w='100%' h={'100%'} bg='gray.500'>
        {/* Product & Category */}
        <ProductCategory/>
    </GridItem>
    <GridItem colSpan={1} w='100%' h={'100%'} bg='blue.500' p={2}>
      {/* <Receipt/> */}
    </GridItem>
    </Grid>
    )
}