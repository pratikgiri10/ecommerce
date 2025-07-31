import { createSlice } from "@reduxjs/toolkit"

const order = {}
const orderSlice = createSlice({
    name: 'order',
    initialState: order,
    reducers: {
        createOrder: (state, action) => {
            state.order = action.payload
        },
        clearOrder: (state) => {
            state.order = {}
        }
    }
})

export const {createOrder, clearOrder} = orderSlice.actions
export default orderSlice.reducer