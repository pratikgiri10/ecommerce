import React, { useEffect, useState } from 'react'

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
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, setToCart, decreaseQuantity } from '@/features/cart/cartSlice'

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
  },[])
  // console.log(item)
  return ( 
   <Card className='flex justify-between bg-gray-300 text-black h-fit'>
          <CardContent>
            <ProductImage prod_image={item.prod_image} className={'h-[250px] w-[400px]'}/>
              {/* <img className='h-52 object-cover' src={img} alt="" /> */}
           </CardContent>
         <div className='flex flex-col items-center gap-8 mb-2'>
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
            className='bg-black text-xl'
            onClick={handleMinusCount}
            >-</Button>
            <p className='text-xl'>{count}</p>
            <Button
            size='sm'
            className='bg-black text-xl'
            onClick={handleAddCount}
            >+</Button>
          </div>
          <div>
            <Button 
            onClick={handleRemoveFromCart}
            className='bg-black'>Remove from Cart</Button>
          </div>
         </div>
         {/* <Button className='w-full bg-orange-600'>Checkout</Button> */}
  </Card>
  )
}

export default Cart