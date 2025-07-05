import mongoose from "mongoose";

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

const User = mongoose.model('User', userSchema)
export default User