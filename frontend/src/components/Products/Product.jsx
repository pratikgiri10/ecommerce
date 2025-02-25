import React from 'react'
import Item from './Item'
import item1 from '../../assets/lp1.webp'
import item2 from '../../assets/lp2.webp'

  

const Product = () => {
  return (
   <div className='mt-8 flex flex-col items-center gap-10 w-full overflow-y-hidden'>
    <h1 className='text-4xl font-semibold'>Featured Products</h1>
    <div className='flex flex-wrap justify-center items-center gap-4  w-full'>
        <Item img={item1}/>
        <Item img={item1}/>
        <Item img={item1}/>
        <Item img={item1}/>
        <Item img={item2}/>
        <Item img={item2}/>
        <Item img={item2}/>
        <Item img={item2}/>
        <Item img={item2}/>
    </div>
   </div>
    
  )
}

export default Product