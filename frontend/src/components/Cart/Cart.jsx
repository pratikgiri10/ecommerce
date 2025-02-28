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
import ProductImage from '../Products/ProductImage'

const Cart = ({item}) => {
  const [count, setCount] = useState(1)
  console.log(item)
  return ( 
   <Card className='flex bg-white text-black'>
          <CardContent>
            <ProductImage prod_image={item.prod_image}/>
              {/* <img className='h-52 object-cover' src={img} alt="" /> */}
           </CardContent>
         <div className='flex flex-col gap-10'>
          <div className='flex justify-center gap-10 items-baseline'>
            <div>
              <CardHeader className='justify-start items-start'>
                  <CardTitle >{item.prod_name}</CardTitle>
                  <CardDescription className='text-left'>{item.prod_description}</CardDescription>
              </CardHeader>
            
            </div>
            <div>
              <CardFooter>
                  <p>{item.price}</p>
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