import React from 'react'
import WriteReviews from './WriteReviews'

const Review = () => {
    
  return (
        
            <div className='relative flex  border border-gray-200 rounded-md p-4 my-4 mx-12 shadow-sm space-x-4'>
                <div className='w-20 h-20 rounded-full border'></div>
               <div className='space-y-4'>
                <WriteReviews />
                    {/* <div className=''>
                        <h1 className='text-xl font-semibold'>Name</h1>
                    </div>
                    <div className=''>
                        <p className='text-base font-medium text-gray-400'>Review</p>
                    </div>
                    <div className='absolute top-0 right-5'>
                        <span className='text-sm text-gray-800'>Posted Date</span>
                    </div> */}
               </div>
            </div>
       
  )
}

export default Review