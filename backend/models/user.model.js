import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "node:crypto"
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    defaultAddress: {
        addressLine1: {
            type: String,
            required: [true, "Please provide an address"],
        },
        addressLine2: {
            type: String,        
        },
        city: {
            type: String,
            required: [true, "Please provide us the name of the city"],
        },
        state: {
            type: String,
            required: [true, "Please provide us the name of the province"],
        },
        phone: {
            type: String,
            required: [true, "Please provide us your phone number"],
        },
        postalCode: {
            type: String,
            required: [true, "Please provide us the postal code of your area"],
        },
    },
    role: {
        type: String,
        default: 'user'
    },
    // only refresh token is stored in db not access token
    refreshToken: {
        type: String
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiry: Date

}, {timestamps: true})

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
userSchema.methods.comparePassword = async function (inputPassword){
    return await bcrypt.compare(inputPassword, this.password)
}
userSchema.methods.generateResetToken = async function (){
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordTokenExpiry = Date.now() + 10 * 60 * 1000
    return resetToken    
}
const User = mongoose.model('User', userSchema)

export default User

