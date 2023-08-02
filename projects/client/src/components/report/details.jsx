import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios"
import { useEffect, useState } from "react";
import { ButtomTemp } from "../button";

export const TransactionDetails = ({transactionId}) => {
    const [isOpen, onOpen, onClose] = useDisclosure();
    // const [ details, setDetails ] = useState([]);
    // const [ info, setInfo ] = useState({})
    const toast = useToast();

    const handleDetails = async() => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/report/sales/${transactionId}`);
            // setDetails(data.result);
            // setInfo(data.tsInfo);
            console.log(data)
        } catch (err) {
            console.log(err)
            toast({
                title: 'Failed to fetch data',
                description: 'Please try again later',
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }
    }

    useEffect(() => {
        handleDetails()
    }, [isOpen])

    return (
        <>
        <ButtomTemp content={transactionId} func={onOpen} />
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Transaction # {transactionId}</DrawerHeader>

            <DrawerBody>

            </DrawerBody>

            <DrawerFooter>
                <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
                </Button>
                <Button colorScheme='blue'>Save</Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
        </>
    )
}