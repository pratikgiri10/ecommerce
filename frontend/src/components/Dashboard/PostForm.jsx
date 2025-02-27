import React, { useId } from 'react'
import {useForm} from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import service from '@/appwrite/config'
import { useDispatch } from 'react-redux'
import { postProducts } from '@/features/product/productSlice.js'
import { useNavigate } from 'react-router-dom'

const PostForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const fileId = useId();
    const onSubmit = async (data) => {
        console.log(data)
        console.log(typeof data.price)
        const file = await service.uploadFile(data.image[0])
        if(file){
           
            data.image = file.$id
           data.price = Number(data.price)
            const dbPost = await service.createProd({...data})
            if(dbPost){
               
                dispatch(postProducts({data}))
                navigate('/viewproducts')
            }
        }
    }
  return (
   
    <form onSubmit={handleSubmit(onSubmit)} className='w-[50%] flex flex-col gap-4 bg-white py-4 px-6 rounded-lg'>
        <h1 className='text-xl font-semibold'>Add Products</h1>
     
      <Input type='text' placeholder='product name' {...register('name')}/>     
      <Input type='text' placeholder='description' {...register('description')}/>
      <Input type='file' placeholder='image' {...register('image')}/>
      <Input type='number' placeholder='price' {...register('price')}/>
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span className='text-red-600'>This field is required</span>}

     <Button className='bg-orange-600'>Submit</Button>
    </form>
  )
}

export default PostForm