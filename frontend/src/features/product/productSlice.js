import {createSlice} from '@reduxjs/toolkit'

const initialState = {
   products: []
}
export const productSlice = createSlice({
name: 'product',
initialState,
reducers: {
   
    postProducts: (state, action) => {
        state.products = action.payload
        
    }
}
})
export const {postProducts} = productSlice.actions
export default productSlice.reducer
