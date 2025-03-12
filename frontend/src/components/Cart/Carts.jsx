import React, { useEffect, useState } from 'react'
import Cart from './Cart'
import phone1 from '../../assets/s25.avif'
import Checkout from './Checkout'
import { useSelector } from 'react-redux'

const Carts = () => {
  // const [items, setItems] = useState([])
  const items = useSelector(state => state.cart.items)

  const val = items.reduce((acc, item) => acc+item.price*item.quantity,0)
  console.log('item',items)
  console.log(val)
 
  
  
  return (
    <div className='flex justify-between px-8 py-4 w-full'>
       <div className='w-[800px]'>
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