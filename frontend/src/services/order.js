import { api, authenticated } from "."


export const postShippingAddress = async () => {
    return await authenticated(api).post('order/postShippingAddress')
}