import React, { useState } from 'react'
import { Button } from '../ui/button'

const Checkout = () => {
    const [price, setPrice] = useState(99)
    const [discount, setDiscount] = useState(9)
    const [total, setTotal] = useState(90)

    const date = new Date(new Date().getTime()+ (3*24*60*60*1000));
  return (
    <div className='border-2 px-4 py-6 w-[50%]'>
        <h1 className='text-2xl text-left font-semibold'>Checkout</h1>
        <div className='flex flex-col gap-4 px-6 py-4'>
            <h2 className='text-lg'>Delivery Date: </h2>
            <p>{date.toLocaleString()}</p>
           <div className='flex items-center justify-between'>
                <h2 className='text-lg'>Subtotal</h2>
                <p>{price}</p>
           </div>
           <div className='flex items-center justify-between'>
                <h2 className='text-lg'>Discount</h2>
                <p>{discount}</p>
           </div>
           <div className='flex border-t-2 items-center justify-between'>
                <h2 className='text-lg'>Total</h2>
                <p>{total}</p> 
           </div>
        </div>
        <Button className='bg-orange-600'>Proceed to Checkout</Button>
    </div>
  )
}

export default Checkout