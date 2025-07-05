import { url } from 'inspector'
import mongoose from 'mongoose'
import { type } from 'os'
const { Schema } = mongoose

const productSchema = new Schema ({
    title: {
        type: String,
        required: [true, "A product title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "A product description is required"],
        trim: true
    },
    imageUrl: {
        type: [
            {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        ],
        required: [true, 'image is required']
    },
    price: {
        type: Number,
        required: [true, "A product must have a price"],
        min: [1, "A product price must be more than or equal to 1"],
    },
    category: {
        type: String
    },
    stock: {
        type: Number,
        required: [true, "A product quantity is required"],
        min: [1, "A product quantity cannot be less than 1"],
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'new'
    }
}, {timestamps: true})

const Product = mongoose.model('Product', productSchema)

export default Product