import { Grid, GridItem } from '@chakra-ui/react'
import { NavbarDummy } from '../components/navbarDummy'
import { Outlet } from 'react-router-dom'

export const SetupPage = () => {
    return (
    <Grid templateColumns='2fr 11fr' bgColor='' w='100vw' h='100vh' overflowX={'hidden'}>
    <GridItem colSpan={1} w='100%' h={'100%'}>
        <NavbarDummy/>
    </GridItem>
    <GridItem colSpan={1} w='100%' h={'100%'}>
        <Outlet/>
    </GridItem>
    </Grid>
    )
}