import { configureStore } from '@reduxjs/toolkit';
import accountSlice from "./accountSlice";
import cartSlice from "./cartSlice";
import reportSlice from "./reportSlice";
import navigationSlice from './navigationSlice';

export default configureStore({
    reducer: {
        accountSlice,
        cartSlice,
        reportSlice,
        navigationSlice
    }
})