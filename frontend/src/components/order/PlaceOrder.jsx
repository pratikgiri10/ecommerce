import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const PlaceOrder = ({ orderNumber, shipping, tax, shippingAddress, paymentMethod, estimatedDelivery }) => {
  const items = useSelector(state => state.cart.items)
  const subTotal = items.reduce((acc, item) => acc+item.price*item.quantity,0)
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`${import.meta.env.VITE_DOMAIN}/users/getuser`, {
        withCredentials: true
      })
      console.log(response.data)
    }
    getUser()
  },[])
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">
          Thank you for your purchase. We've sent a confirmation to your email.
        </p>
        <p className="font-medium mt-2">Order #{orderNumber}</p>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        
        {/* Items */}
        <div className="divide-y">
          {items.map((item) => (
            <div key={item.$id} className="py-4 flex items-center">
              <div className="w-16 h-16 bg-gray-200 rounded mr-4">
                {item.image && (
                  <img 
                    src={item.image} 
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
            <span>Rs{subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-600">Shipping</span>
            <span>Rs{shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-600">Tax</span>
            <span>Rs{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 font-bold text-lg">
            <span>Total</span>
            <span>Rs{(subTotal+shipping+tax).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Shipping & Payment Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3">Shipping Information</h2>
          <address className="not-italic text-gray-700">
            <p>{shippingAddress.name}</p>
            <p>{shippingAddress.street}</p>
            <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}</p>
            <p>{shippingAddress.country}</p>
          </address>
          <div className="mt-3 text-gray-700">
            <p><span className="font-medium">Estimated delivery:</span> {estimatedDelivery}</p>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3">Payment Information</h2>
          <div className="flex items-center">
            {paymentMethod.type === 'card' && (
              <>
                <div className="w-10 h-6 bg-blue-100 rounded mr-3"></div>
                <div>
                  <p className="font-medium">{paymentMethod.cardType}</p>
                  <p className="text-gray-600">**** **** **** {paymentMethod.lastFour}</p>
                </div>
              </>
            )}
            {paymentMethod.type === 'paypal' && (
              <>
                <div className="w-10 h-6 bg-blue-100 rounded mr-3"></div>
                <div>
                  <p className="font-medium">PayPal</p>
                  <p className="text-gray-600">{paymentMethod.email}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 text-center">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Continue Shopping
        </button>
        <div className="mt-4">
          <a href="/orders" className="text-blue-600 hover:underline">
            View Order History
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;