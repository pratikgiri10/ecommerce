import { api } from "."

export const signInUser = (data) => {
    return api.post('/users/login/', data)
}
export const signUpUser = (data) => {
    return api.post('/users/register/', data)
}