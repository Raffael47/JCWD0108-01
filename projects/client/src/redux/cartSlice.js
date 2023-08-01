const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    value: {
        ProductId: 0,
        quantity: 0,
        refresh: false
    }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCart: ( state, action ) => {
            state.value.ProductId = action.payload.ProductId
            state.value.quantity = action.payload.quantity
        },
        refreshCart: ( state, action ) => {
            state.value.refresh = !state.value.refresh
        }
    }
})

export const { updateCart, refreshCart } = cartSlice.actions;
export default cartSlice.reducer;