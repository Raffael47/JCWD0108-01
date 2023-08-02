const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    value: {
        refresh: false
    }
};

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        refreshState: ( state, action ) => {
            state.value.refresh = !state.value.refresh
        }
    }
});

export const { refreshState } = reportSlice.actions;
export default reportSlice.reducer;