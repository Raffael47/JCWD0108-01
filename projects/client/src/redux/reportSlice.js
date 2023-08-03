const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    value: {
        refresh: false,
        startDate: '',
        endDate:'',
        time: ''
    }
};

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        handleStart: ( state, action ) => {
            state.value.startDate = action.payload.startDate;
            state.value.refresh = !state.value.refresh;
        },
        handleEnd: ( state, action ) => {
            state.value.endDate = action.payload.endDate;
            state.value.refresh = !state.value.refresh;
        },
        handleTime: ( state, action ) => {
            state.value.time = action.payload.time;
            state.value.refresh = !state.value.refresh;
        }
    }
});

export const { handleStart, handleEnd, handleTime } = reportSlice.actions;
export default reportSlice.reducer;