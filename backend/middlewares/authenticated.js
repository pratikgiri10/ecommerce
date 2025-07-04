import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ObjectId } from 'mongodb';
import User from '../models/user.model.js'
// import { db } from '../controllers/Auth/auth.controller.js';

//this is the middleware to check whether the user making the req is a authenticated user
//to check that, we get the access token that should be present in the cookie or request header if ther user is authenticated otherwise access is not given
//then the token from req is verified with jwt access token secret
//after verification, we find the authenticated user from database and the response is added to the req which can be used later in the controller or somewhere
export const isAuthenticated = asyncHandler( async (req,res, next) => {
    try {
        const accessToken = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer", "");
    if(!accessToken)
        throw new ApiError(401, "Unauthorized request")
        // return res.status(401).json({error: "Access Denied"})
   
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        // console.log(decoded)
        const user = await User.findOne({
            _id: new ObjectId(decoded.id)
         })
        // {$projection: {password: 0, refreshToken: 0}}
        // console.log(user)
        if(!user)
            throw new ApiError(401, "Invalid access token")
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, error?.message)
    }
   
})