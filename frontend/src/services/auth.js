import { api } from "."

export const signInUser = (data) => {
    return api.post('/auth/login/', data)
}
export const signUpUser = (data) => {
    return api.post('/auth/register/', data)
}
export const forgotPassword = (data) => {
    return api.post('/auth/password/forgot', data)
}
export const resetPassword = (data) => {
    return api.post('/auth/password/reset', data)
}
export const changePassword = (data) => {
    return api.post('/auth/password/change', data)
}