import Item from '@/components/Products/Item'
import React from 'react'
import lp1 from '../assets/lp1.webp'
import lp2 from '../assets/lp2.webp'
import ph1 from '../assets/s25.avif'
import Navbar from '@/components/Header/Navbar'

function Product() {
  return (
    <div className='flex flex-col gap-4 w-full h-[100%]'>
        <Navbar />
       <div className='flex flex-col items-center justify-center gap-4 w-full '>
            <div className='flex flex-wrap justify-center items-center gap-4 w-full'>
                <Item img={lp1}/>
                <Item img={lp2}/>
                <Item img={lp1}/>
                <Item img={lp2}/>
                <Item img={lp2}/>          
                <Item img={ph1}/>
                <Item img={ph1}/>
                <Item img={ph1}/>
                <Item img={ph1}/>
            </div>
       </div>
        
    </div>
  )
}

export default Product