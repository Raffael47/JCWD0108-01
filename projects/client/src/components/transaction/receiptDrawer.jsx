import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading, Icon, Image, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios"
import { useEffect, useState } from "react";
import { convertToRp } from "../../helper/rupiah";
import { sortDate } from "../../helper/date";
import { Receipt } from "./receipt";
import { ButtomTemp } from "../button";

export const ReceiptButton = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <>
        <ButtomTemp width={'100%'} content={'Checkout'} func={onOpen} display={{base: 'block', md:'none'}} />
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