import mongoose from 'mongoose'
import User from './user.model'
import Product from './product.model'

const { Schema } = mongoose

const orderSchema = new Schema ({
    orderPrice: {
        type: Number
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    orderItems: {
        type: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: Product
                },
                quantity: {
                    type: Number
                }
            }
        ]
    },
    paymentMethod: {
        type: String
    },
    paymentStatus: {
        type: String,
        default: 'pending'
    },
    status: {
        type: String,
        default: 'pending'
    }

}, {timestamps: true})