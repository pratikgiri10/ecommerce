import React, { lazy, Suspense, useEffect } from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from "../components/Header/Navbar"
import Product from '../components/Products/Product'
import HeroSection from '@/components/HeroSection'
import Banner from '@/components/Banner'

// const Product = lazy(() => import('../components/Products/Product'))
const Home = () => {
 
  return (
    <div className='w-full'>
      <Navbar />     
      <HeroSection />
      <Product />
      <Banner />
      <Footer />
    </div>
  )
}

export default Home