import React, { useEffect, useState } from 'react'
import Cart from './Cart'
import phone1 from '../../assets/s25.avif'
import Checkout from './Checkout'
import { useSelector } from 'react-redux'

const Carts = () => {
  const [items, setItems] = useState([])
  const item = useSelector(state => state.cart.items)
  useEffect(() => {
    
    // setItems(prev => [...prev, item])
    console.log(item)
  },[])
  
  
  return (
    <div className='flex gap-4'>
       <div>
        {item.map((item) => (
           <Cart key={item.$id} item={item}/>
        ))}
          {/* <Cart img={phone1}/>
          <Cart img={phone1}/>
          <Cart img={phone1}/> */}
       </div>
        <Checkout />
        
    </div>
  )
}

export default Carts