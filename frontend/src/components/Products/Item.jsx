import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
 
import { Button } from '../ui/button'
import ProductImage from './ProductImage'
import { useDispatch, useSelector } from 'react-redux'
import { setToCart } from '@/features/cart/cartSlice'
import { useNavigate } from 'react-router-dom'

const Item = ({item, className}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const status = useSelector((state) => state.auth.isLoggedIn)
  const addToCart = () => {
   
    if(status){
      dispatch(setToCart(item))
      navigate('/cart')
    }
    else{
      navigate('/login')
    }
    
  }

  return (
    <Card className={`bg-white text-black ${className}`}>
       <CardContent>
        <ProductImage prod_image={item.prod_image} className={'h-[250px] w-[500px]'}/>
           {/* <img className='h-52 w-full object-cover' src={img} alt="" /> */}
        </CardContent>
      <div className='flex justify-between items-baseline'>
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
      <Button 
      onClick={addToCart}
      className='w-full bg-black rounded-none'>Add to Cart</Button>
    </Card>

  )
}

export default Item