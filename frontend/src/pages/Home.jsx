import React, { lazy, Suspense, useEffect } from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from "../components/Header/Navbar"
import Product from '../components/Products/Product'

// const Product = lazy(() => import('../components/Products/Product'))
const Home = () => {
 
  return (
    <div className='w-full'>
        <Navbar />
     
      
          <Product />
      
      
        
        <Footer />
    </div>
  )
}

export default Home