import {client} from '../../config/dbConfig.js'
import jwt from 'jsonwebtoken'
import { asyncHandler } from '../../utils/asyncHandler.js';
import {ApiError} from '../../utils/ApiError.js'
import { ApiResponse } from '../../utils/ApiResponse.js';
export const db = client.db('ecommerce');

const generateToken = async (userId) => {
    try{
        const user = await db.collection('users').findOne({_id: userId});
      
        if(!user)
            throw new ApiError(400, 'cannot find the user')
        const accessToken = jwt.sign({
                id: user._id,
                username: user.name,
                email: user.email
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
      
        const refreshToken = jwt.sign({
                id: user._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
       
        await db.collection('users').updateOne(
            {_id: userId},
            { $set: {
                accessToken: accessToken,
                refreshToken: refreshToken,
                lastUpdated: new Date()
            }}
        
        )
        return {accessToken, refreshToken}
        

    }catch(err){
        throw new ApiError(401, "can't generate token")
    }
}

export const register =  asyncHandler(async (req, res) => {
  
    console.log("register")
    const {name, email, password} =  req.body;   
    console.table(req.body)
   
    if(
        [name, email, password].some((field) => field?.trim() === "")
    )
        throw new ApiError(400, "please fill all the fields")
        // return res.status(400).json({error: "please fill all the fields"})

    const existingUser = await db.collection('users').findOne({email})

    if(existingUser)
        throw new ApiError(409, "user already exists")
        // return res.status(401).json({message: 'user already exist'})

    
        const response = await db.collection('users').insertOne({
            name,
            email,
            password
        })
        return res.status(201).json(
            new ApiResponse(200, response, "user registered successfully")
        )
        // res.status(200).json({success: true})
   
})

export const login = asyncHandler(async (req, res) => {
    const {username: email, password} = req.body
        // console.table(req.body)
    if(!email || !password)
        throw new ApiError(400, "please fill all the fields")
        // return res.status(400).json({error: "please fill all the fields"}) 
   
    const response = await db.collection('users').findOne({email})
    // console.log(response.password)
    if(response.password !== password)
        throw new ApiError(401, "Invalid user credentials")

    if(!response)
        throw new ApiError(404, 'user does not exist')
    
    const {accessToken, refreshToken} =  await generateToken(response._id)
    const user = await db.collection('users').findOne(
        {email},
        { projection: {password: 0, refreshToken: 0}}
    )
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    }
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", options).json(
        new ApiResponse(
            200,
            {
                user: user, accessToken, refreshToken
            },
            "User logged in successfully"  
        )
    )
    // response.password == password ? res.cookie("token", token, options).json({response, success: true}) : res.status(404).json({success: false, error: "email doesn't exist"})
           
        
       
   
})
//to logout, we have used auth middleware to verify the user is authenticated user
//after verification, we move to this controller where we update the refresh token to undefined in the database and also clear the token from cookie
//by doing this the user will be logged out as the user wouldn't have token to verify their authenticity
//thus user is required to login
export const logout = asyncHandler(async (req, res) => {
    const userId = req.user._id
    await db.collection('users').findOneAndUpdate({_id: userId}, {$set : {refreshToken: undefined}}, {new: true})
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    }
     return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(new ApiResponse(200, {}, "User logged out"))
})

//this function is used to generate new token when the  access token expires
//we use the refresh token that the user sents through body or from the cookie and verify it from database
//if it is verified then we generate the new token and update the cookie with this new token 
export const refreshAccessToken = asyncHandler(async (req,res) => {
   try {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken)
        throw new ApiError(401, "Unauthorized request")

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await db.collection('users').findOne({_id: decodedToken.id})
    if(!user)
        throw new ApiError(401, 'Invalid refresh token')
    if(incomingRefreshToken !== user?.refreshToken){
        throw new ApiError(401, "refresh token is expired or used")
    }

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    }

    const {accessToken, refreshToken: newRefreshToken} = await generateToken(user._id)
    return res.status(200).cookie("accessToken", accessToken).cookie("refreshToken", newRefreshToken).json(new ApiResponse(200, {accessToken, refreshToken: newRefreshToken}))
   } catch (error) {
        throw new ApiError(401, "Unauthorized request")
   }


})
export const auth = (req,res) => {
    res.status(200).json(new ApiResponse(200, req.user, "user is loggedin"))
    // const token = req.cookies.accessToken;
    // // console.log(token)
    // if(!token)
    //     return res.status(401).json({error: "Access Denied"})
    // try{
    //     const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    //     res.status(200).json(new ApiResponse(
    //         200,
    //         {user: decoded},
    //         "authorized user"
    //     ))
    //     res.json({success: true, user: decoded})
    // }catch(error){
       
    //     throw new ApiError(401, "unauthorized request")
    // }
}

export const getUsers = asyncHandler(async (req,res) => {
    const users = await db.collection('users').find(
        {},
        {projection: {password: 0, accessToken: 0, refreshToken: 0}
    }).toArray()
    
    if(!users)
        new ApiError(401,'bad request' )

    res.status(200).json(new ApiResponse(200, users, 'users were found'))
})

export const getUser = asyncHandler(async(req,res) => {
    const id = req.user._id
    const user = await db.collection('users').find({_id: id}, {projection: {password: 0, accessToken: 0, refreshToken: 0}}).toArray()
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
    const user = await db.collection('users').find({_id: id}, {projection: data}).toArray()
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
    const user = await db.collection('users').findOneAndUpdate({_id: id}, { $set : {name: 1, addressLine1, addressLine2, city, state, zipCode, phone}}, {new: true})
    console.log(user)
})