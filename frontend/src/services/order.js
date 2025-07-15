import { api, authenticated } from "."


export const postShippingAddress = async (data) => {
    return await authenticated(api).post('order/postshippingaddress', data)
}
export const postUserOrder = async (data) => {
    return await authenticated(api).post('order/postuserorder', data)
}
export const getAllOrders = async () => {
    return await authenticated(api).get('order/getallorders')
}
export const getOrderOfCurrentUser = async () => {
    return await authenticated(api).get('order/getuserorderhistory')
}
export const updateOrderStatus = async () => {
    return await authenticated(api).put('order/updateorderstatus')
}