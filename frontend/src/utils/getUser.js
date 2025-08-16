import { api, authenticated } from "@/services"

export const getUser = async () => {
    const user = await authenticated(api).get('/users/getuser')
    return user.data.data
}