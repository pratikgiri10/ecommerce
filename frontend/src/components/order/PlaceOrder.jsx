import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCurrentUserQuery } from '@/api/user';
import { selectTotalDiscountedPrice } from '@/features/selectors/cartSelector';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { usePostOrderMutation} from '@/api/order';
import { clearCart } from '@/features/cart/cartSlice';


const PlaceOrder = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.items)
 
  // const subTotal = items.reduce((acc, item) => acc+item.price*item.quantity,0)
const discountedPrice = useSelector(selectTotalDiscountedPrice)
const shippingAddress = useSelector(state => state.order.order)
    
const estimatedDelivery = new Date(new Date().getTime()+ (3*24*60*60*1000))

const {data: user, isSuccess: isUserFetched} = useGetCurrentUserQuery()
const {mutate: createUserOrder} = usePostOrderMutation()

const handlePlaceOrder = () => {
  if(!isUserFetched) return
  const orderData = {
    order_price: discountedPrice,
    order_items: cartItems?.map((item) => ({
      product: item._id,
      quantity: item.quantity
 })),
    customer: user?.data?.data?._id,
    shipping_address: {
      address_line1: shippingAddress?.addressLine1,
      address_line2: shippingAddress?.addressLine2,
      city: shippingAddress?.city,
      state: shippingAddress?.state,
      phone: shippingAddress?.phone,
      postal_code: shippingAddress?.zipCode
    },

  }


  createUserOrder(orderData, {
    onSuccess: () => {
      dispatch(clearCart())
      // dispatch(clearOrder())
       toast.success('Order Confirmed', {
          style: {
            fontSize: '1rem'
          },
          actionButtonStyle: {
              background: 'white',
              color: 'black',
              fontSize: '0.8rem'
            },
          action: {
            label: 'View Order',
            onClick: () => {
              navigate('/orderhistory')
            }
          }
        })
    },
    onError: (error) => {
      console.log(error);
      
      toast.error('Failed to confirm order')
    }
  })
 
}
const handleCancelOrder = () => {
  const isConfirmed = confirm('Are you sure you want to cancel?')
  isConfirmed ? navigate('/') : null
}


  
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 mb-4">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Confirm Your Order</h1>
        {/* <p className="text-gray-600">
          Thank you for your purchase. We've sent a confirmation to your email.
        </p> */}
        {/* <p className="font-medium mt-2">Order #{orderNumber}</p> */}
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        
        {/* Items */}
        <div className="divide-y">
          {cartItems.map((item) => (
            <div key={item._id} className="py-4 flex items-center">
              <div className="w-16 h-16 bg-gray-200 rounded mr-4">
                {item.imageUrl && (
                  <img 
                    src={item.imageUrl[0].url} 
                    alt={item.name} 
                    className="w-full h-full object-cover rounded"
                  />
                )}
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">{item.prod_name}</h3>
                <p className="text-gray-500">Qty: {item.quantity}</p>
              </div>
              <div className="font-medium">
                Rs{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        
        {/* Totals */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between py-1">
            <span className="text-gray-600">Subtotal</span>
            <span>Rs{discountedPrice.toFixed(2)}</span>
          </div>
         
          <div className="flex justify-between py-2 font-bold text-lg">
            <span>Total</span>
            <span>Rs{(discountedPrice).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Shipping & Payment Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3">Shipping Information</h2>
          <address className="not-italic text-gray-700">
           {isUserFetched &&  <p>{user?.data?.data?.name}</p>}
            <p>{shippingAddress.addressLine1}</p>
            <p>{shippingAddress.addressLine2}</p>
            <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
            <p>{shippingAddress.country}</p>
            <p>{shippingAddress.phone}</p>
          </address>
          <div className="mt-3 text-gray-700">
            <p><span className="font-medium">Estimated delivery:</span> {estimatedDelivery.toDateString()}</p>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3">Payment Information</h2>
          <div className="flex items-center">
           
           
                <div className="w-10 h-6 bg-green-700 rounded mr-3"></div>
                <div>
                  <p className="font-medium">Esewa</p>
                  {/* <p className="text-gray-600">{paymentMethod.email}</p> */}
                </div>
              
          
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 text-center space-x-2">
        <button 
        onClick={handlePlaceOrder}
        className="btn-primary text-white px-8 py-3 rounded-lg font-medium  transition-colors">
          Place Your Order
        </button>
         <button 
         onClick={handleCancelOrder}
         className="bg-gray-200 text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors">
          Cancel
        </button>
        {/* <div className="mt-4">
          <a href="/orders" className="text-blue-600 hover:underline">
            View Order History
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default PlaceOrder;