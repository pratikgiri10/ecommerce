import Order from "../../models/order.model";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";

export const postUserOrder = asyncHandler(async(req,res) => {
    if(!req.body.data)
        throw new ApiError(400, 'please fill all the fields')
    const order = await Order.create(req.body.data)
})
export const getOrderDetails = asyncHandler(async(req,res) => {

})
export const cancelOrder = asyncHandler(async(req,res) => {

})
export const changeOrderStatus = asyncHandler(async(req,res) => {

})