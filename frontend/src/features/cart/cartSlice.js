import { createSlice } from "@reduxjs/toolkit";
const userId = JSON.parse(localStorage.getItem('userId'))
// Load from localStorage
const loadCart = () => {
   
    const savedCart = localStorage.getItem(`cart_${userId}`);
    return savedCart ? JSON.parse(savedCart) : { items: []};
  };

export const cartSlice = createSlice({
    name: 'cart',
    initialState: loadCart(),
    reducers: {
        setToCart: (state, action) => {
            const cart = action.payload

           const existingItem = state.items.find((item) => item.$id === cart.$id)
           if(existingItem){
            existingItem.quantity +=1
           }
           else{
            state.items.push({...cart, quantity: 1})
           }
            // state.totalPrice += cart.price;
            // Save to localStorage
            localStorage.setItem(`cart_${userId}`, JSON.stringify(state));
        },
        decreaseQuantity: (state,action) => {
            const cart = action.payload
            const existingItem = state.items.find((item) => item.$id === cart.$id)
            if(existingItem){
             existingItem.quantity -=1
            }
         
          localStorage.setItem(`cart_${userId}`, JSON.stringify(state));
        },
        removeFromCart: (state, action) => {
            const cart = action.payload
            const items = state.items.filter((item) => item.$id !== cart.$id)
            state.items = items
            localStorage.setItem(`cart_${userId}`, JSON.stringify(state));
        }
    }
})

export default cartSlice.reducer
export const {setToCart, removeFromCart, decreaseQuantity}  = cartSlice.actions