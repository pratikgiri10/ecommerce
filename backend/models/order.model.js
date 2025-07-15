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
    shippingAddress: {
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
    paymentMethod: {
        type: String,
        enum: ["esewa", "cash_on_delivery"],
        default: "cash_on_delivery",
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
    },
    paymentDetails: {
      refId: String,
      paidAt: Date,
    },
    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
    Delivered: {
        type: Date
    }

}, {timestamps: true})

const Order = mongoose.model('Order', orderSchema)
export default Order