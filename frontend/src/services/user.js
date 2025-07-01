import { api, authenticated } from "."

export const getCurrentUserDetails = () => {
    authenticated(api).get('/users/getUser')
}