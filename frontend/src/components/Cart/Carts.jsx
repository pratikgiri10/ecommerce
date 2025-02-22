import React from 'react'
import Cart from './Cart'
import phone1 from '../../assets/s25.avif'
import Checkout from './Checkout'

const Carts = () => {
  return (
    <div className='flex gap-4'>
       <div>
          <Cart img={phone1}/>
          <Cart img={phone1}/>
          <Cart img={phone1}/>
       </div>
        <Checkout />
        
    </div>
  )
}

export default Carts