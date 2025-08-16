import React from 'react'
import WriteReviews from './WriteReviews'
import { useGetReviewByIdQuery } from '@/api/review'

const Review = ({ prodId }) => {
    const { data: reviews, isSuccess } = useGetReviewByIdQuery(prodId)


    return (
        <div className=''>
            <div className='flex border border-gray-200 rounded-md p-4 my-4 mx-12 shadow-sm space-x-4'>

                <div className='space-y-4 w-full'>
                    {isSuccess && reviews?.map((review) => (
                        <div className='relative flex items-center gap-4 w-full'>
                            <div className='w-20 h-20 rounded-full border'></div>
                            <div className='space-y-2 '>
                                <div className=''>
                                    <h1 className='text-xl font-semibold'>Name</h1>
                                </div>
                                <div className=''>
                                    <p className='text-base font-medium text-gray-400'>Review</p>
                                </div>
                                <div className='absolute top-0 right-0 flex flex-col gap-4'>
                                    <span className='text-sm text-gray-800'>Posted Date</span>
                                    <span className='text-sm text-gray-800'>Rating</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {isSuccess && (reviews.length < 1 &&
                        <div className='space-y-2 max-w-md w-full mx-auto'>
                            <span>No reviews has been provided. Be the first one to give a review.</span>
                            <WriteReviews
                                prodId={prodId}
                            />
                        </div>
                    )}


                </div>
            </div>
        </div>

    )
}

export default Review