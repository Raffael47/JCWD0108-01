import { Flex, Select } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { handleTime } from "../../redux/reportSlice";
import { useEffect, useRef } from "react";

export const SortBy = () => {
    const dispatch = useDispatch();
    const timeRef = useRef();
    const {refresh} = useSelector((state) => state.reportSlice.value)
    
    const handleSort = (value) => {
        const time = timeRef.current.value
        console.log(time)
        dispatch(handleTime({time}))
    }

    // useEffect(() => {
    //     handleSort(timeRef)
    // }, [])

    return (
        <Flex w='100%' justifyContent={'end'}>
            <Select onChange={handleSort} ref={timeRef} w='20%' variant={'outline'} color='red.200'>
                <option value={'day'}>Day</option>
                <option value={'hour'}>Hour</option>
                <option value={'week'}>Week</option>
                <option value={'month'}>Month</option>
                <option value={'year'}>Year</option>
            </Select>
        </Flex>
    )
}