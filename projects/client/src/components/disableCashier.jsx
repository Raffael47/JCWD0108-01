import { Box, Button, useDisclosure, useToast } from '@chakra-ui/react'
import { NotAllowedIcon } from '@chakra-ui/icons';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, } from '@chakra-ui/react'
import Axios from 'axios'

export const DisableButton = ({ id }) => {
    const toast = useToast();
    const token = localStorage.getItem('token');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const onDelete = async () => {
        try {
            await Axios.put(`http://localhost:8000/api/account/disableCashier/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
                'content-Type': 'Multiple/form-data'
            });
            toast({
                title: 'Success!',
                description: 'Cashier Disabled!',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top'
            })
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Box>
            <Button borderRadius={'50px'} onClick={onOpen} color={'red'} bg={'#292C2D'}><NotAllowedIcon/></Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg='#676767' color='#ffffff' fontFamily='Inter'>Disable Cashier</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={1}>
                        Are you sure want to disable this cashier?
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onDelete} mr={'10px'} color='#ffffff' fontFamily='Inter' bg={'#292C2D'} colorScheme={'red'}>Disable</Button>
                        <Button onClick={onClose} mr={'110px'} bg={'#292C2D'} color='#ffffff' fontFamily='Inter' colorScheme={'blackAlpha'}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>

    )
}