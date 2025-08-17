import { Rating, Star } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { usePostReviewMutation } from '@/api/review'
import { toast } from 'sonner'



const WriteReviews = ({ prodId }) => {
    const [rating, setRating] = useState(0)
    const { handleSubmit, register, reset } = useForm({
        defaultValues: {

        }
    })
    const { mutate: createReview, isPending } = usePostReviewMutation()
    const handleReviews = ({ review }) => {
        const data = {
            review,
            rating,
            product: prodId
        }
        createReview({ data }, {
            onSuccess: () => {
                toast.success('review submitted successfully')
                reset()
                setRating(0)
            },
            onError: () => {
                toast.error('something went wrong')
            }
        })
    }
    return (
        <div className=''>
            <form onSubmit={handleSubmit(handleReviews)} className='space-y-4'>
                <Rating
                    style={{ maxWidth: 150 }}
                    itemStyles={{
                        itemShapes: Star,
                        activeFillColor: '#ffb700',
                        inactiveFillColor: '#ccc'
                    }}
                    value={rating}
                    onChange={setRating}
                />
                <Textarea
                    placeholder='write a review...'
                    {...register('review', {
                        maxLength: 100
                    })}
                    className='resize-none '
                />


                <Button
                    disabled={isPending}
                    className='btn-primary'>Submit Review</Button>

            </form>
        </div>
    )
}

export default WriteReviews