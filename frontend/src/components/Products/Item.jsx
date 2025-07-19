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
  // const status = useSelector((state) => state.auth.isLoggedIn)


  const handleItemClick = (e) => {
  
    navigate(`/productdetails/${item._id}`)
  }

  // const addToCart = (e) => {
  //   // e.stopPropagation()
  //   console.log(item);
  //   if(status){
  //     dispatch(setToCart(item))
  //     navigate('/cart')
  //   }
  //   else{
  //     navigate('/login')
  //   }
    
  // }

  return (
    <Card 
    onClick={handleItemClick} 
    className={`w-full max-w-sm mx-auto bg-transparent text-black border-none transition-all duration-300 ${className}`}>
      
        <ProductImage
        className='w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105'
        prod_image={item.imageUrl[0].url} 
        />
       
      <div className='flex justify-between items-baseline'>
      <div>
       <CardHeader className='px-0'>
          
                <CardTitle className='truncate font-medium'>{item.title}</CardTitle>
               <CardDescription className='text-left font-medium line-clamp-1'>{item.description}</CardDescription>
       
        </CardHeader>
        <CardContent>
           <span>Rs.{item.price}</span>
        </CardContent>
      
       </div>
       
      </div>
      {/* <Button 
      onClick={addToCart}
      className='w-full btn-primary text-gray-900 rounded-none'>Add to Cart</Button> */}
    </Card>

  )
}

export default Item