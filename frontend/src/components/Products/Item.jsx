import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import ProductImage from './ProductImage'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Item = ({ item, className }) => {
  const navigate = useNavigate()

  const handleItemClick = (e) => {

    navigate(`/productdetails/${item._id}`)
  }


  return (
    <Card
      onClick={handleItemClick}
      className={` group w-full max-w-sm bg-transparent text-black border-none transition-all duration-300 ${className}`}>

      <ProductImage
        className='w-full h-[200px] sm:h-[300px] object-cover transition-transform duration-300 group-hover:scale-105'
        prod_image={item.imageUrl[0].url}
      />

      <div className='flex justify-between items-baseline'>
        <div>
          <CardHeader className='px-0'>

            <CardTitle className='truncate font-medium text-[1rem] sm:text-[1.5rem]'>{item.title}</CardTitle>
            <CardDescription className='text-left font-medium line-clamp-1 '>{item.description}</CardDescription>

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