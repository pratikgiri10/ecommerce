import { api } from "."

export const signInUser = (data) => {
    return api.post('/auth/login/', data)
}
export const signUpUser = (data) => {
    return api.post('/auth/register/', data)
}