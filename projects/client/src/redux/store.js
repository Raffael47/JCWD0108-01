import { configureStore } from '@reduxjs/toolkit';
import accountSlice from "./accountSlice";
import cartSlice from "./cartSlice";
import reportSlice from "./reportSlice";

export default configureStore({
    reducer: {
        accountSlice,
        cartSlice,
        reportSlice
    }
})