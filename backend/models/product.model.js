import mongoose from 'mongoose'
const { Schema } = mongoose

const productSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    price: {
        type: Number
    },
    category: {
        type: String
    },
    stock: {
        type: Number
    },
    status: {
        type: String,
        default: 'new'
    }
}, {timestamps: true})

const Product = mongoose.model('Product', productSchema)

export default Product