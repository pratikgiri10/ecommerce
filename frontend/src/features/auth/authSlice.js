import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    username: "",
   
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true,
            state.username = action.payload.username
            
        },
        logout: (state) => {
            state.isLoggedIn = false
            state.username = ""
          
        }

    }
})

export const {login, logout} = authSlice.actions
export default authSlice.reducer
