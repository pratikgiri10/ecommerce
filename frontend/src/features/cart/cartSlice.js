import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: [
        {
            prod_id:'',
            prod_name: '',
            prod_description: '',
            prod_image: '',
            price: null
        }
    ]
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setToCart: (state, action) => {
            state.carts = action.payload
        },
        removeFromCart: (state) => {
            state.carts = []
        }
    }
})