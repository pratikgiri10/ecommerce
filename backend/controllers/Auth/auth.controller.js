import jwt from 'jsonwebtoken'
import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiError } from '../../utils/ApiError.js'
import { ApiResponse } from '../../utils/ApiResponse.js';
import User from '../../models/user.model.js'
import { sendMail } from '../../utils/sendMail.js';
import crypto from 'node:crypto'

const generateToken = async (userId) => {
    try {
        const user = await User.findOne({ _id: userId });

        if (!user)
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

        await User.findByIdAndUpdate(
            { _id: userId },
            {
                $set: {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    lastUpdated: new Date()
                }
            }

        )
        return { accessToken, refreshToken }


    } catch (err) {
        throw new ApiError(401, "can't generate token")
    }
}

export const register = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;
    // console.table(req.body)

    if (
        [name, email, password].some((field) => field?.trim() === "")
    )
        throw new ApiError(400, "please fill all the fields")
    // return res.status(400).json({error: "please fill all the fields"})

    const existingUser = await User.findOne({ email })

    if (existingUser)
        throw new ApiError(409, "user already exists")
    // return res.status(401).json({message: 'user already exist'})

    const newUser = await User.create({
        name,
        email,
        password
    })



    return res.status(201).json(
        new ApiResponse(200, newUser, "user registered successfully")
    )
    // res.status(200).json({success: true})

})

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        throw new ApiError(400, "please fill all the fields")
    // return res.status(400).json({error: "please fill all the fields"}) 

    const response = await User.findOne({ email })
    // console.log(response.password)
    if (!response)
        throw new ApiError(404, 'user does not exist')

    const isMatch = await response.comparePassword(password)
    if (!isMatch)
        throw new ApiError(401, "Invalid user credentials")



    const { accessToken, refreshToken } = await generateToken(response._id)
    const user = await User.findOne(
        { email },
        { projection: { password: 0, refreshToken: 0 } }
    )
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
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
    await User.findOneAndUpdate({ _id: userId }, { $set: { refreshToken: undefined } }, { new: true })
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
export const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
        if (!incomingRefreshToken)
            throw new ApiError(401, "Unauthorized request")

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findOne({ _id: decodedToken.id })
        if (!user)
            throw new ApiError(401, 'Invalid refresh token')
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'lax'
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateToken(user._id)
        return res.status(200).cookie("accessToken", accessToken).cookie("refreshToken", newRefreshToken).json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }))
    } catch (error) {
        throw new ApiError(401, "Unauthorized request")
    }


})
export const auth = (req, res) => {
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



export const forgotPassword = asyncHandler(async (req, res) => {

    const user = await User.findOne({ email: req.body.email })


    if (!user)
        throw new ApiError(404, 'user not found')

    const resetToken = await user.generateResetToken()


    await user.save({ validateBeforeSave: false })

    const resetUrl = `${req.headers.origin}/resetPassword/${resetToken}`
    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try {
        await sendMail(message)
    } catch (error) {
        console.log(error);

    }


    res.status(200).json(new ApiResponse(200, user, 'user found'))

    // generate the reset password token
    // create the resetUrl
    // send the resetUrl through mail
})

// this api is used when user clicks the resetUrl from email
// which navigates the user to create the new password
export const resetPassword = asyncHandler(async (req, res) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpiry: { $gt: Date.now() }
    })
    if (!user)
        throw new ApiError(400, 'Password reset token is invalid or has been expired')

    user.password = req.body.password

    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpiry = undefined
    await user.save()

    res.status(200).json(new ApiResponse(200, user, 'password changed successfully'))

})

export const changePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('+password')

    const isMatch = await user.comparePassword(req.body.oldPassword)
    if (!isMatch)
        throw new ApiError(400, 'Old password is incorrect')

    user.password = req.body.password
    await user.save()

    res.status(200).json(new ApiResponse(200, user, 'password changed successfully'))

})

export const registerAdmin = asyncHandler(async (req, res) => {
    console.log('register admin');
    const existingEmail = await User.findOne({ email: req.body.email })

    if (existingEmail)
        throw new ApiError(401, 'User already Exist')

    const existingAdmin = await User.findOne({ role: 'admin' })
    if (!existingAdmin)
        throw new ApiError(401, 'There is no admin who can register you')

    if (!(existingEmail.email == req.user.email))
        throw new ApiError(401, 'User not authorized to register admin')


    const admin = await User.create({
        name: 'Super Admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
    })
    res.status(200).json(new ApiResponse(200, admin, 'admin registered successfully'))


})