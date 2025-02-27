import React, { useEffect, useState } from 'react'
import Item from './Item'
import item1 from '../../assets/lp1.webp'
import item2 from '../../assets/lp2.webp'
import service from '@/appwrite/config'

  

const Product = () => {
  const [item, setItem] = useState([])
   
  useEffect(() => {
    // console.log(post)
      service.getProds().then((data) =>{
          console.log(data)
           setItem(data.documents)
      })
  }, [])
  return (
   <div className='mt-8 flex flex-col items-center gap-10 w-full overflow-y-hidden'>
    <h1 className='text-4xl font-semibold'>Featured Products</h1>
    <div className='flex flex-wrap justify-center items-center gap-4  w-full'>
      {item.map((item) => (
           <Item key={item.$id} item={item}/>
      ))}
    </div>
   </div>
    
  )
}

export default Product