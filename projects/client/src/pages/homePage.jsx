import { Grid, GridItem } from '@chakra-ui/react'
import { ProductCategory } from '../components/productCategory'
import { Receipt } from '../components/transaction/receipt'

export const HomePage = () => {
    return (
    <Grid templateColumns='8fr 3fr' bgColor='' w='100%' h='100vh' overflowX={'hidden'}>
    <GridItem colSpan={1} w='100%' h={'100%'} bg='gray.500'>
        <ProductCategory/>
    </GridItem>
    <GridItem colSpan={1} w='100%' h={'100%'} bg='blue.500' p={2}>
        <Receipt/>
    </GridItem>
    </Grid>
    )
}