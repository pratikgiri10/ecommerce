import { api, authenticated } from "."

export const getCurrentUserDetails = () => {
    return authenticated(api).get('/users/getuser')
}
export const getAllUsersDetails = () => {
    return api.get('/users/getallusers')
}
export const getUserAddress = async () => {
    return await authenticated(api).get('users/getaddress')
}
export const updateDefaultAddress = async (data) => {
    return authenticated(api).put('/users/updateaddress', data)
}