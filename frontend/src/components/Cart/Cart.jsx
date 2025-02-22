import React, { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from '../ui/button'

const Cart = ({img}) => {
  const [count, setCount] = useState(1)
  return ( 
   <Card className='flex bg-white text-black'>
          <CardContent>
              <img className='h-52 object-cover' src={img} alt="" />
           </CardContent>
         <div className='flex flex-col gap-10'>
          <div className='flex justify-center gap-10 items-baseline'>
            <div>
              <CardHeader className='justify-start items-start'>
                  <CardTitle >Laptop</CardTitle>
                  {/* <CardDescription className='text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, quas.</CardDescription> */}
              </CardHeader>
            
            </div>
            <div>
              <CardFooter>
                  <p>$99</p>
              </CardFooter>
            </div>
          </div>
          <div className='flex justify-center items-center gap-4'>
            <Button 
            size='sm'
            className='bg-orange-600 text-xl'
            onClick={() => {
              setCount(count-1)}}
            >-</Button>
            <p className='text-xl'>{count}</p>
            <Button
            size='sm'
            className='bg-orange-600 text-xl'
            onClick={() => {
              setCount(count+1)}}
            >+</Button>
          </div>
         </div>
         {/* <Button className='w-full bg-orange-600'>Checkout</Button> */}
  </Card>
  )
}

export default Cart