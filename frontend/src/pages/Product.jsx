import Item from '@/components/Products/Item'
import React from 'react'
import lp1 from '../assets/lp1.webp'
import lp2 from '../assets/lp2.webp'
import ph1 from '../assets/s25.avif'
import Navbar from '@/components/Header/Navbar'
import ProductComponent from '@/components/Products/Product'

function Product() {
  return (
    <div className='flex flex-col gap-4 w-full h-[100%]'>
        <Navbar />
       <ProductComponent />
    </div>
  )
}

export default Product