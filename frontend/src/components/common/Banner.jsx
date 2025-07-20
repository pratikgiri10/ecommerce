import React from 'react'
import banner from '../../assets/cover4.jpg'
import Input from './Input'
import Button from './Button'
import { cn } from '@/lib/utils'
const Banner = () => {
  return (
    <div className=' bg-yellow-500 mt-16'>
       
        <div className='flex justify-between max-w-7xl mx-auto px-4 sm:px-12'>
          <div className='mt-20 space-y-8'>
              <h1 className='text-3xl font-medium text-gray-800 max-w-xl'>Get flat 20% discount by subscribing to our newsletter</h1>
              <div className='flex items-center w-full mt-3 space-x-8'>
                  <input className='bg-transparent text-black outline-none border-b py-4 flex-1 placeholder-black' placeholder= 'Enter your email'/>
                  <Button children='Subscribe' className='bg-transparent border border-black text-black px-4 py-2 rounded hover:bg-black hover:text-yellow-500'/>
              </div>
          </div>
          <div className='w-[500px] h-[500px] py-8 px-4'>
            <img src='https://images.unsplash.com/photo-1583394838336-acd977736f90' alt="banner" className='w-full h-full object-cover'/>
          </div>
        </div>
    </div>
   
  )
}

export default Banner