import { api, authenticated } from "."

export const getCurrentUserDetails = () => {
    authenticated(api).get('/users/getUser')
}
export const getAllUsersDetails = () => {
    return api.get('/users/getallusers')
}