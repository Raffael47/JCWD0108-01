import { Button, Modal, ModalCloseButton, ModalContent, ModalOverlay, ModalHeader, ModalBody, useDisclosure, Center } from "@chakra-ui/react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { sortDate } from "../../helper/date";

export const CalendarButtonTemp = ({when, content, onClickDay}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
        <Button
            variant={'solid'}
            color={'white'}
            alignItems={'center'}
            justifyContent={'center'}
            zIndex={'20'}
            w='10rem'
            bgColor={'black'}
            onClick={onOpen}
            borderRadius={'8px'}
            _hover={{bgColor: 'red.200', color: 'black'}}
            >
                {content ? sortDate(content) : `Select ${when} date`}
            </Button>
            <Modal
            isOpen={isOpen}
            onClose={onClose}
            colorScheme='red'
            >
            <ModalOverlay />
                <ModalContent>
                    <ModalHeader> {when} Date </ModalHeader>
                    <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Center>
                                <Calendar onClickDay={onClickDay} />
                            </Center>
                        </ModalBody>
                </ModalContent>
            </Modal> 
        </>
    )
}