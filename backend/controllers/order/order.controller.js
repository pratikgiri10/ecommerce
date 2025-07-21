import Order from "../../models/order.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const postUserOrder = asyncHandler(async(req,res) => {
    const {order_price, order_items, shipping_address} = req.body
    
    if(!req.body)
        throw new ApiError(400, 'please fill all the fields')

    if(!Array.isArray(order_items) || order_items.length < 1)
        throw new ApiError(400, 'no order items provided')
    
    const order = await Order.create(req.body)
    res.status(200).json(new ApiResponse(200, order, 'order creted successfully'))
})
export const getOrderDetails = asyncHandler(async(req,res) => {

})
export const cancelOrder = asyncHandler(async(req,res) => {

})
export const changeOrderStatus = asyncHandler(async(req,res) => {

})