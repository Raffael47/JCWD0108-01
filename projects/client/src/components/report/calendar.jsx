import { Input, Flex, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { handleEnd, handleStart } from "../../redux/reportSlice";

export const CalendarButtonTemp = () => {
    const dispatch = useDispatch();
    const startDateRef = useRef();
    const endDateRef = useRef();

    const handleStartDate = () => {
        dispatch(handleStart({startDate: startDateRef.current.value}))
        console.log(startDateRef)
    }

    const handleEndDate = () => {
        dispatch(handleEnd({endDate: endDateRef.current.value}))
    }
    return (
        <Flex gap={3} color={'white'} justifyContent={'end'} alignItems={'center'}>
            <Input onChange={handleStartDate} type="datetime-local" size={'lg'} ref={startDateRef} />
            <Text fontWeight={'bold'} color={'white'} >to</Text>
            <Input onChange={handleEndDate} type="datetime-local" size={'lg'} ref={endDateRef} />
        </Flex>
    )
}