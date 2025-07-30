import { api, authenticated } from "."

export const getCurrentUserDetails = () => {
    return authenticated(api).get('/users/getuser')
}
export const getAllUsersDetails = async () => {
    const response = await  api.get('/users/getallusers')
    return response.data.data
}
export const getUserAddress = async () => {
    return await authenticated(api).get('users/getaddress')
}
export const updateUser = async (id, data) => {
    const response = await api.put(`users/updateuser/${id}`, data)
    return response.data.data
}
export const updateDefaultAddress = async (data) => {
    return authenticated(api).put('/users/updateaddress', data)
}