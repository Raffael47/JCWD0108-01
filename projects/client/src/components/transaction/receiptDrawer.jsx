import { Drawer, DrawerBody, DrawerContent, DrawerOverlay, useDisclosure } from "@chakra-ui/react";
import { Receipt } from "./receipt";
import { ButtomTemp } from "../button";

export const ReceiptButton = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <>
        <ButtomTemp width={'80%'} content={'Checkout'} func={onOpen} display={{base: 'block', md:'none'}} />
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            size={'xs'}
        >
            <DrawerOverlay />
            <DrawerContent bgColor={'gray.900'} color={'white'}>
                <DrawerBody overflowY={'auto'}>
                    <Receipt/>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
        </>
    )
}