import { api, authenticated } from "."


export const postShippingAddress = async (data) => {
    return await authenticated(api).post('order/postshippingaddress', data)
}
export const postUserOrder = async (data) => {
    return await authenticated(api).post('order/postuserorder', data)
}
export const getAllOrders = async () => {
    const response = await authenticated(api).get('order/getallorders')
    return response.data.data
}
export const getOrderOfCurrentUser = async () => {
    return await authenticated(api).get('order/getuserorder')
}
export const updateStatus = async (id, data) => {
    return await authenticated(api).patch(`order/updatestatus/${id}`, data)
}
export const deleteOrder = async (id) => {
    return await authenticated(api).delete(`order/deleteorder/${id}`)
}