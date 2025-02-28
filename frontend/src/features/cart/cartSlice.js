import { createSlice } from "@reduxjs/toolkit";
const userId = JSON.parse(localStorage.getItem('userId'))
// Load from localStorage
const loadCart = () => {
   
    const savedCart = localStorage.getItem(`cart_${userId}`);
    return savedCart ? JSON.parse(savedCart) : { items: [], totalPrice: 0 };
  };
// const initialState = {
//     carts: [
//         {
//             prod_id:'',
//             prod_name: '',
//             prod_description: '',
//             prod_image: '',
//             price: null
//         }
//     ]
// }

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
           state.totalPrice += cart.price;
             // Save to localStorage
            localStorage.setItem(`cart_${userId}`, JSON.stringify(state));
        },
        removeFromCart: (state) => {
            state.carts = []
        }
    }
})

export default cartSlice.reducer
export const {setToCart, removeFromCart}  = cartSlice.actions