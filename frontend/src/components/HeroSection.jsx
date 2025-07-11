import React from 'react'
import cv1 from '../assets/cover.jpg'
import cv2 from '../assets/cover2.jpg'
import cv3 from '../assets/cover3.jpg'

const HeroSection = () => {
  return (
    <div className='flex flex-col gap-6 w-full'>
        <div className='w-full h-[80vh] lg:max-w-screen-lg xl:max-w-screen-xl mx-auto py-8'>              
            <img 
            className='w-full h-full object-cover '
            src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e' alt="bg" />
        </div>    
        <div className='flex justify-center items-center w-full'>
                <div className='mx-16 bg-gray-950 flex flex-col justify-center lg:flex-row lg:items-center  gap-8 lg:gap-20 px-10 py-10 lg:py-0 lg:h-[100px] shadow-sm w-full text-white'>
                    <div className='flex flex-col justify-center gap-2'>
                        <p className=' text-lg xl:text-xl font-medium text-yellow-600 '>Free Shipping</p>
                        <p className='text-sm'>When Ordering over 20k</p>
                    </div>
                    <div className='flex flex-col justify-center gap-2'>
                        <p className=' text-lg xl:text-xl font-medium text-yellow-600 '>Free Return</p>
                        <p className='text-sm'>Return Product Within 30days</p>
                    </div>
                    <div className='flex flex-col justify-center gap-2'>
                        <p className='text-lg xl:text-xl font-medium text-yellow-600 '>Cash on Delivery</p>
                        <p className='text-sm'>Also pay cash when delivered</p>
                    </div>
                    <div className='flex flex-col justify-center gap-2'>
                        <p className='text-lg xl:text-xl font-medium text-yellow-600'>Quality Products</p>
                        <p className='text-sm'>Get the best quality </p>
                    </div>
                </div>
        </div>
            {/* <div>
                <img src={cv2} alt="bg" />
            </div> */}

    </div>
  )
}

export default HeroSection