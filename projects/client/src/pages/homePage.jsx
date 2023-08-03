import { Grid, GridItem } from '@chakra-ui/react'
import { ProductCategory } from '../components/productCategory'
import { Receipt } from '../components/transaction/receipt'
import { ReceiptButton } from '../components/transaction/receiptDrawer'

export const HomePage = () => {
    return (
    <Grid templateColumns='repeat(11, 1fr)' bgColor='' w='100%' h='100vh' overflowX={'hidden'}>
    <GridItem colSpan={{base: 11, md: 8}} w='100%' h={'100%'} bg='gray.500'>
        <ProductCategory/>
        <ReceiptButton />
    </GridItem>
    <GridItem display={{base: 'none', md: 'block'}} colSpan={{base: 0, md: 3}} w='100%' h={'100%'} bg='blue.500' p={2}>
        <Receipt/>
    </GridItem>
    </Grid>
    )
}