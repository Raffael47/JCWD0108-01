import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        reduxId: 0,
        username: "",
        email: "",
        imgProfile: "",
        isAdmin: false
    }
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value.reduxId = action.payload.id
            state.value.username = action.payload.username
            state.value.email = action.payload.email
            state.value.imgProfile = action.payload.imgProfile
            state.value.isAdmin = action.payload.isAdmin
        },
        logout: (state, action) => {
            state.value.reduxId = 0
            state.value.username = ""
            state.value.email = ""
            state.value.imgProfile = ""
            state.value.isAdmin = false
        }
    }
});

export const { login, logout } = accountSlice.actions;
export default accountSlice.reducer;