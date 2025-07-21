import React, { useEffect, useState } from 'react'
import Cart from './Cart'
import Checkout from './Checkout'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, loadUserCart } from '@/features/cart/cartSlice';

const Carts = () => {
  
  const dispatch = useDispatch()
  
  const items = useSelector(state => state.cart.items)

 
 useEffect(() => {
  dispatch(loadUserCart())
 }, [])
  
  
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
         {/* cart items */}
         <div className='lg:col-span-2'>
         
          <div className='bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden'>
             <div className='p-6 border-b border-gray-200'>
              <h1 className='text-xl font-semibold text-gray-900'>Cart Items</h1>
             </div>
             <div className='divide-y divide-gray-200'>
              {items.map((item) => (              
                <Cart key={item._id} item={item}/>
              ))}
             </div>
          </div>
          {items.length < 1 && <div>No items in cart</div>}
         </div>
         {/* checkout section */}
         <div className='lg:col-span-1'>
             {items.length >=1 && <Checkout />}
         </div>
         
        </div>
         
      </div>
      
    </div>
  )
}

export default Carts