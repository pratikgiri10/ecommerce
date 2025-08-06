import Review from "../../models/review.model.js";
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

})
export const deleteReview = asyncHandler(async(req,res) => {
    
})