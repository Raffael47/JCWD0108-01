import { Grid, GridItem } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/sidebar'

export const SetupPage = () => {
    return (
    <Grid templateColumns={'repeat(13, 1fr)'} bgColor='' w='100vw' h='100vh' overflowX={'hidden'}>
    <GridItem colSpan={{base: 0, lg: 2}} w='100%' h={'100%'}>
        <Sidebar/>
    </GridItem>
    <GridItem colSpan={{base: 13, lg: 11}} w='100%' h={'100%'}>
        <Outlet/>
    </GridItem>
    </Grid>
    )
}