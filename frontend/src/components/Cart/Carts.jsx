import React, { useEffect, useState } from 'react'
import Cart from './Cart'
import Checkout from './Checkout'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, loadUserCart } from '@/features/cart/cartSlice';

const Carts = () => {
  // const [items, setItems] = useState([])
  const dispatch = useDispatch()
  dispatch(loadUserCart())
  const items = useSelector(state => state.cart.items)

  const val = items.reduce((acc, item) => acc+item.price*item.quantity,0)
  console.log('item',items)
  console.log(val)
 
  
  
  return (
    <div className='flex gap-4 px-8 py-4 w-full'>
       <div className='w-[1000px]'>
        {items.map((item) => (
         
           <Cart key={item.$id} item={item}/>
        ))}
        {items.length < 1 && <div>No items in cart</div>}
       </div>
        {items.length >=1 && <Checkout price={val} items={items}/>}
    </div>
  )
}

export default Carts