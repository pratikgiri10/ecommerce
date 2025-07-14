import { asyncHandler } from '../../utils/asyncHandler.js';
import {ApiError} from '../../utils/ApiError.js'
import { ApiResponse } from '../../utils/ApiResponse.js';
import User from '../../models/user.model.js'

export const getUsers = asyncHandler(async (req,res) => {
    console.log('api hit');
     
     const users = await User.find({}).select({password: 0})
     console.log(users);
              
    if(!users)
        throw new ApiError(401,'bad request' )

    res.status(200).json(new ApiResponse(200, users, 'users were found'))
  
   
})

export const getUser = asyncHandler(async(req,res) => {
    const id = req.user._id
    const user = await User.find({_id: id}, {projection: {password: 0, accessToken: 0, refreshToken: 0}}).toArray()
    if(!user)
        return new ApiError(401, 'user not found')

    res.status(200).json(new ApiResponse(200, user, 'user was found'))
    // console.log('user:',user)
})
export const getAddress = asyncHandler(async (req,res) => {
    const id = req.user._id
    const data = {
        addressLine1: 1,
        addressLine2:1, 
        city: 1, 
        state: 1, 
        zipCode: 1,
        phone: 1,
         _id: 0
    }
    const user = await User.find({_id: id}, {projection: data}).toArray()
    if(!user)
        return new ApiError(401, 'user not found')
    if(user.length < 1 || user.every(obj => Object.keys(obj).length < 2)){
        res.status(200).json(new ApiResponse(200, null, 'Address not found'))
    }
    else{
        res.status(200).json(new ApiResponse(200, user, 'Address found'))
    }
    
    
})
export const postAddress = asyncHandler(async(req,res) => {
    const {addressLine1, addressLine2, city, state, zipCode, phone} = req.body.data
    const id = req.user._id
    const user = await User.findOneAndUpdate({_id: id}, { $set : {name: 1, addressLine1, addressLine2, city, state, zipCode, phone}}, {new: true})
    console.log(user)
})
// this is only for testing as i can completely empty the document 
export const deleteUsers = async(req, res) => {
    console.log('deleting');
    
    await User.deleteMany({})
}