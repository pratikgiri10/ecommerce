import { Rating, Star } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'



const WriteReviews = () => {
    const {handleSubmit, register} = useForm({
        defaultValues: {

        }
    })
    const handleReviews = (data) => {

    }
  return (
    <div>
        <form onSubmit={handleSubmit(handleReviews)}>
            <Input 
            type='text'
            placeholder='write a review...'
            {...register('review', {
                maxLength: 100
            })}
            />
            <Rating 
            style={{maxWidth: 200}}
            itemStyles={{                
                itemShapes: Star,
                activeFillColor: '#ffb700',
                inactiveFillColor: '#ccc'
            }}
           
            />
            <Button className='btn-primary w-full'>Submit</Button>
            
        </form>
    </div>
  )
}

export default WriteReviews