import { configureStore } from '@reduxjs/toolkit';
import accountSlice from "./accountSlice";
import cartSlice from "./cartSlice";

export default configureStore({
    reducer: {
        accountSlice,
        cartSlice
    }
})