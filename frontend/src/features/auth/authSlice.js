import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetails: {},
    isLoading: true
    // address1: "",
    // address2: "",
    // city: "",
    // state: "",
    // zip: "",
    // country: "",
    // phone: "",

}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userDetails = action.payload
            state.isLoading = false
        },
        logout: (state) => {

            state.userDetails = {}
            state.isloading = true

        },
        setAddress: (state, action) => {
            state.address = action.payload
            // state.address1 = action.payload.address1
            // state.address2 = action.payload.address2
            // state.city = action.payload.city
            // state.state = action.payload.state
            // state.zip = action.payload.zip
            // state.country = action.payload.country
            // state.phone = action.payload.phone
        }

    }
})

export const { login, logout, setAddress } = authSlice.actions
export default authSlice.reducer
