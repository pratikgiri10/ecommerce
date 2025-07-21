import mongoose from 'mongoose'
import User from './user.model.js'
import Product from './product.model.js'

const { Schema } = mongoose

const orderSchema = new Schema ({
    order_price: {
        type: Number
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    order_items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number
            }
        }
    ],
    shipping_address: {
      address_line1: {
        type: String,
        required: [true, "Please provide an address"],
      },
      address_line2: {
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
      postal_code: {
        type: String,
        required: [true, "Please provide us the postal code of your area"],
      },
    },
    payment_method: {
        type: String,
        enum: ["esewa", "cash_on_delivery"],
        default: "cash_on_delivery",
    },
    payment_status: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
    },
    payment_details: {
      refId: String,
      paidAt: Date,
    },
    order_status: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
    delivered: {
        type: Date
    }

}, {timestamps: true})

const Order = mongoose.model('Order', orderSchema)
export default Order