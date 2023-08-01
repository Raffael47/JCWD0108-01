import { Heading, Stack, Text } from "@chakra-ui/react"

export const Error404 = () => {
    return (
        <Stack
        justifyContent={'center'}
        w='100%'
        h='100%'
        alignItems={'center'}>
            <Heading
            fontWeight={600}
            color={'red'}
            fontSize={'6xl'}
            >
                404
            </Heading>
            <Text
            color='white'
            fontSize={'3xl'}
            >
                Oops! Can't find what you're looking for
            </Text>
        </Stack>
    )
}