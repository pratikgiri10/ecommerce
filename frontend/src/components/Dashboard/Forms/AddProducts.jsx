import React, { useEffect, useId, useRef } from 'react'
import {useForm} from 'react-hook-form'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import service from '@/appwrite/config'
import { useDispatch } from 'react-redux'
import { postProducts } from '@/features/product/productSlice.js'
import { useNavigate } from 'react-router-dom'

const AddProducts = () => {
    const {register, handleSubmit, setFocus, formState: {errors}} = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const categoryList = [
      { value: "Electronics", label: "Electronics" },
      { value: "Cameras", label: "Cameras" },
      { value: "Laptops", label: "Laptops" },
      { value: "Accessories", label: "Accessories" },
      { value: "Headphones", label: "Headphones" },      
      { value: "Books", label: "Books" },
    ];
    const onSubmit = async (data) => {
        console.log(data)
        console.log(typeof data.price)
        // const file = await service.uploadFile(data.image[0])
        if(file){
           
            data.image = file.$id
           data.price = Number(data.price)
            // const dbPost = await service.createProd({...data})
            if(dbPost){
               
                dispatch(postProducts({data}))
                navigate('/viewproducts')
            }
        }
    }
    useEffect(() => {
     setFocus('name')
    },[])
  return (
    <div className='min-h-screen flex justify-center items-center bg-orange-600'>
         <form onSubmit={handleSubmit(onSubmit)} className='w-[50%] flex flex-col gap-4 bg-white py-4 px-6 rounded-lg'>
            <h1 className='text-xl font-semibold'>Add Products</h1>
        
          <Input required type='text' placeholder='product name' {...register('name')}/>     
          <Input type='text' placeholder='description' {...register('description')}/>
          {/* <Input type='text' placeholder='category' {...register('category')}/> */}
          <select className='outline-none border-2 px-3 py-2 rounded-md' {...register('category')}>
            {categoryList.map((category) => (
              <option key={category.value} className=''>{category.label}</option>
            ))}
          </select>
          <Input required type='number' placeholder='stock' {...register('stock')}/>
          <Input required type='number' placeholder='price' {...register('price')}/>
       
          <Input accept='.png, .jpeg, .jpg' type='file' placeholder='image' {...register('image')} className=''/>
         
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span className='text-red-600'>This field is required</span>}

          <Button className='bg-orange-600'>Submit</Button>
        </form>
    </div>
   
   
  )
}

export default AddProducts