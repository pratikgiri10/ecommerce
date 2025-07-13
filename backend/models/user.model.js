import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
    role: {
        type: String,
        default: 'user'
    },
    // only refresh token is stored in db not access token
    refreshToken: {
        type: String
    }
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
const User = mongoose.model('User', userSchema)

export default User

