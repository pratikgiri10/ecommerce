import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '../ui/button'

const Checkout = ({price, items}) => {
     console.log(price)
    const [discount, setDiscount] = useState(100)
    const [total, setTotal] = useState()

    const date = new Date(new Date().getTime()+ (3*24*60*60*1000));

    const discountedPrice = useMemo(() => {        
     return price = price - discount   
    }, [price])

    useEffect(()=> {
     setTotal(price)        
    },[price])
  return (
    <div className='border-2 px-4 py-6 h-[500px] w-[500px]'>
        <h1 className='text-2xl text-left font-semibold'>Checkout</h1>
        <div className='flex flex-col gap-4 px-6 py-4'>
            <h2 className='text-lg'>Delivery Date: </h2>
            <p>{date.toLocaleString()}</p>
           
               {items.map((item) => (
                     <div key={item.$id} className='flex items-center justify-between'>
                          <h2 className='text-lg'>{item.prod_name}</h2>
                          <p>{item.price}</p>
                    </div>
               ))}
           
           <div className='flex items-center justify-between border-t-2'>
                <h2 className='text-lg'>Subtotal</h2>
                <p>{total}</p>
           </div>
           <div className='flex items-center justify-between'>
                <h2 className='text-lg'>Discount</h2>
                <p>{discount}</p>
           </div>
           <div className='flex border-t-2 items-center justify-between'>
                <h2 className='text-lg'>Total</h2>
                <p>{discountedPrice}</p> 
           </div>
        </div>
        <Button className='bg-orange-600'>Proceed to Checkout</Button>
    </div>
  )
}

export default Checkout