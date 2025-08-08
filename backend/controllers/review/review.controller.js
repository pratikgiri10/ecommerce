import Review from "../../models/review.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getReviews = asyncHandler(async(req, res) => {
    const reviews = await Review.find({product: req.params.id})
    console.log(reviews);
    res.status(200).json(new ApiResponse(200, reviews, 'reviews fetched successfully'))
})
export const postReview = asyncHandler(async(req,res) => {
    console.log(req.body);
    // const review = await Review.create(
    //     req.body,
    //     product: req.body.prodId,
    //     user: req.user._id
    // )
    res.status(200).json(new ApiResponse(200, 'review posted successfully'))
    
})
export const updateReview = asyncHandler(async(req,res) => {
    const review = await Review.findById(req.params.id)
    if(!review)
        throw new ApiError(404, 'review not found')
    if(review.user !== req.user._id)
        throw new ApiError(401, 'you are not authorized')

    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, {new : true})
    res.status(200).json(new ApiResponse(200, updatedReview, 'review updated successfully'))
})
export const deleteReview = asyncHandler(async(req,res) => {
    const review = await Review.findById(req.params.id)
    if(!review)
        throw new ApiError(404, 'review not found')
    if(review.user !== req.user._id)
        throw new ApiError(401, 'you are not authorized')

    await Review.deleteOne({_id: req.params.id})
    res.status(200).json(new ApiResponse(200, null, 'review deleted successsfully'))
})