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
    return await authenticated(api).get('order/getuserorder')
}
export const updateOrderStatus = async () => {
    return await authenticated(api).put('order/updateorderstatus')
}
export const updatePaymentStatus = async () => {
    return await authenticated(api).put('order/updatepaymentstatus')
}
export const deleteOrder = async () => {
    return await authenticated(api).delete('order/deleteorder')
}