import React, { lazy, Suspense, useEffect } from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from "../components/Header/Navbar"
// import Product from '../components/Products/Product'

const Product = lazy(() => import('../components/Products/Product'))
const Home = () => {
 
  return (
    <div className='w-full'>
        <Navbar />
       <div className='h-screen'>
       <Suspense fallback={<div className='text-4xl text-black'>Loading...</div>}>
          <Product />
        </Suspense>
       </div>
        
        <Footer />
    </div>
  )
}

export default Home