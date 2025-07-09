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

  const handleItemClick = (e) => {
  
    navigate(`/productdetails/${item._id}`)
  }

  const addToCart = (e) => {
    e.stopPropagation()
    if(status){
      dispatch(setToCart(item))
      navigate('/cart')
    }
    else{
      navigate('/login')
    }
    
  }

  return (
    <Card onClick={handleItemClick} className={`bg-transparent text-black w-full border-none ${className}`}>
      
        <ProductImage
        className='w-[350px] h-[300px] object-cover'
        prod_image={item.imageUrl[0].url} 
        />
       
      <div className='flex justify-between items-baseline'>
      <div>
       <CardHeader className='justify-start items-start'>
            <CardTitle >{item.title}</CardTitle>
            <CardDescription className='text-left font-medium'>{item.description}</CardDescription>
            
            <p>Rs.{item.price}</p>
       
        </CardHeader>
      
       </div>
       
      </div>
      {/* <Button 
      onClick={addToCart}
      className='w-full btn-primary text-gray-900 rounded-none'>Add to Cart</Button> */}
    </Card>

  )
}

export default Item