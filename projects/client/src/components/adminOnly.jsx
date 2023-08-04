import { Heading, Icon, Stack, Text } from "@chakra-ui/react"
import { PiProhibitBold } from "react-icons/pi"

export const AdminOnly = () => {
    return (
        <Stack color={'whiteAlpha.700'} alignItems={'center'}>
            <Icon as={PiProhibitBold} color={'red'} w='40' h='40' />
            <Heading size={'3xl'}>
                Access Denied
            </Heading>
            <Text fontSize="lg" mt={1}>
                This page is only accessible by an admin
            </Text>
        </Stack>
    )
}