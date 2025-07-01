import { api } from "."

export const signInUser = (data) => {
    return api.post('/users/login/', data)
}