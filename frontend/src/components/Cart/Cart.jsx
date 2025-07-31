import React, { useEffect, useState } from 'react'
import ProductImage from '../Products/ProductImage'
import { useDispatch } from 'react-redux'
import { removeFromCart, setToCart, decreaseQuantity } from '@/features/cart/cartSlice'
import { Minus, Plus, Trash2 } from 'lucide-react'

const Cart = ({item}) => {
  const dispatch = useDispatch()
  const [count, setCount] = useState()

  const handleAddCount = () => {
    setCount(count+1)
    dispatch(setToCart(item))

  }
  const handleMinusCount = () => {
   
    if(count <= 1){
      setCount(1)
      return
    }
    setCount(count-1)
    dispatch(decreaseQuantity(item))
  }
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item))
  }
  useEffect(() => {
    setCount(item.quantity)
  },[count])
  // console.log(item)
  return ( 
   <div className='p-6 flex gap-4 hover:bg-gray-50 transition-colors'>
         
            <ProductImage prod_image={item.imageUrl?.[0]?.url} className={'w-20 h-20 object-cover rounded-lg flex-shrink-0'}/>
              {/* <img className='h-52 object-cover' src={img} alt="" /> */}
           
         <div className='flex-1'>        
                     
              <h2 className='font-semibold text-gray-900 mb-1'>{item.title}</h2>
              <p className='text-sm text-gray-600 mb-2'>{item.description}</p>                       
            
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <button 
              className='p-1 rounded-full hover:bg-gray-200 transition-colors'
              onClick={handleMinusCount}
              >
                <Minus className='w-4 h-4'/>
              </button>
              <span className='w-8 text-center font-medium'>{count}</span>
              <button
              className='p-1 rounded-full hover:bg-gray-200 transition-colors'
              onClick={handleAddCount}
              >
                <Plus className='w-4 h-4'/>
              </button>
            </div>
             <div className='flex gap-4 item-center'>
              <span className='font-semibold text-lg'>Rs. {item.price}</span>
              <button
              onClick={handleRemoveFromCart}
              className='text-red-500 rounded-full hover:bg-red-50'>
                <Trash2 className="w-4 h-4" />
              </button>
          </div>
          </div>
         
         </div>
         {/* <Button className='w-full bg-orange-600'>Checkout</Button> */}
  </div>
  )
}

export default Cart