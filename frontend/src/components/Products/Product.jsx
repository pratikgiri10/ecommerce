import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Item from './Item'
import item1 from '../../assets/lp1.webp'
import item2 from '../../assets/lp2.webp'
import Loading from '../Loading'
import Button from '../Button'
import { useGetProductQuery } from '@/api/product'

  

const Product = () => {
  const [items, setItems] = useState([])
  // const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)

  const {data: products, isSuccess, isPending} = useGetProductQuery()
  
    
 
  // const chunkArray = (array, chunkSize) => {
  //   const result = [];
  //   for (let i = 0; i < array.length; i += chunkSize) {
  //     result.push(array.slice(i, i + chunkSize));
  //   }
  //   console.log(result)
  //   return result;
  // };

  // const chunkedData = chunkArray(items, 3)
const visibleCards = 3
const totalCards = items?.length
const maxIndex = Math.max(0, totalCards - visibleCards)
  const nextSlide = () => {    
    setIndex(index => index >= maxIndex ? 0 : index+1)
  };

  
  const prevSlide = () => {
    
    setIndex(index => index == 0 ? maxIndex : index-1 )
  }
  
  return (
   
   <div className='mt-16 flex flex-col items-center gap-12 w-full'>     
      <h1 className='text-4xl font-semibold'>Featured Products</h1>
     <div className='flex flex-col gap-4 mx-16 items-end overflow-hidden'>
        <div className='flex items-center gap-4'>
          <Button 
          onClick={prevSlide}
          children='prev' className='bg-black rounded-none'/>
          <Button 
          onClick={nextSlide}
          children='next' className='bg-black rounded-none'/>
        </div>
        {isPending? <Loading /> : 
        <div className={`flex items-center w-full transition-transform duration-300 ease-in-out`}
        style={
          {
            transform: `translateX(-${index * (100/visibleCards)}%)` 
          }
        }
        >
          {products?.data.data.products.map((product) => (                   
           <div key={product._id} className='w-1/3 flex-shrink-0 px-2'>             
                <Item item={product} className=''/>        
           </div>
                         
              
          ))}
        </div>}
     </div>
   </div>
    
  )
}

export default Product