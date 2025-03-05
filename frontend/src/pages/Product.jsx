import { lazy } from 'react'
import React, { Suspense } from 'react'

import Navbar from '@/components/Header/Navbar'
// import ProductComponent from '@/components/Products/Product'
const ProductComponent = lazy(() => import('@/components/Products/Product'))

function Product() {
  return (
    <div className='flex flex-col gap-4 w-full h-[100%]'>
        <Navbar />
        <Suspense fallback={<div className='text-4xl text-black'>Loading...</div>}>
        <ProductComponent />
        </Suspense>
    </div>
  )
}

export default Product