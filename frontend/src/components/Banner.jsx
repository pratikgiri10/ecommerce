import React from 'react'
import banner from '../assets/cover4.jpg'
import Input from './Input'
import Button from './Button'
const Banner = () => {
  return (
    <div className='relative'>
         <div className='h-[500px] mt-16'>
            <img src={banner} alt="banner" className='w-full h-full object-cover'/>
        </div>
        <div className='mx-10 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
            <h1 className='text-3xl font-medium text-white'>Get flat 20% discount by subscribing to our newsletter</h1>
            <div className='flex items-center w-full mt-3'>
                <Input className='rounded-none w-full  py-4' placeholder= 'Enter your email'/>
                <Button children='Subscribe' className=' bg-black text-white rounded-none text-xl py-4 w-full'/>
            </div>
        </div>
    </div>
   
  )
}

export default Banner