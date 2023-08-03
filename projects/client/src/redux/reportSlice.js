const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    value: {
        refresh: false,
        startDate: '',
        endDate:''
    }
};

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        handleStart: ( state, action ) => {
            state.value.startDate = action.payload.startDate;
            state.value.refresh = !state.value.refresh
        },
        handleEnd: ( state, action ) => {
            state.value.endDate = action.payload.endDate;
            state.value.refresh = !state.value.refresh
        }
    }
});

export const { handleStart, handleEnd } = reportSlice.actions;
export default reportSlice.reducer;