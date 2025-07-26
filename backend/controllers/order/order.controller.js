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
    const order = await Order.find({customer: req.user._id})
    .populate('order_items.product', 'title imageUrl price discountPercentage')
    if(!order)
        throw new ApiError(404, 'no orders found')

    res.status(200).json(new ApiResponse(200, order, 'orders found successfully'))
})

export const getAllOrderDetails = asyncHandler(async(req,res) => {
    const order = await Order.find({})
    .populate('customer', 'name email')
    .populate('order_items.product', 'title imageUrl price discountPercentage')
    if(!order)
        throw new ApiError(404, 'no orders found')

    res.status(200).json(new ApiResponse(200, order, 'orders found successfully'))
})

export const changeStatus = asyncHandler(async(req,res) => {
    
    if(!req.body)
        throw new ApiError(401, 'the update data is empty')

   
        const status = await Order.findByIdAndUpdate(req.params.id, {order_status: req.body.order_status}, {new: true})
    if(!status)
        throw new ApiError(401, 'No order found')
   

    res.status(200).json(new ApiResponse(200, status, 'Status Updated Successfully'))
})

export const deleteOrder = asyncHandler(async(req,res) => {
    console.log(req.params.id);
    
    const order = await Order.deleteOne({_id: req.params.id})
    
    if(!order)
        throw new ApiError(401, 'no order found')
    
    res.status(200).json(new ApiResponse(200, order, 'order deleted successfully'))
})