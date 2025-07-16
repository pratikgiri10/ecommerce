import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
const getOrderItems = () => {
    const val = items.reduce((acc, item) => acc+item.price*item.quantity,0)
}
const order = {}
const orderSlice = createSlice({
    name: 'order',
    initialState: order,
    reducers: {
        createOrder: (state, action) => {
            state.order = action.payload
        },
        removeOrder: (state) => {
            state.order = {}
        }
    }
})

export const {createOrder, removeOrder} = orderSlice.actions
export default orderSlice.reducer