import React, { useEffect, useId, useRef, useState } from 'react'
import {useForm} from 'react-hook-form'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { useDispatch } from 'react-redux'
import { postProducts } from '@/features/product/productSlice.js'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { usePostProductMutation } from '@/api/product'
import { toast } from 'sonner'

const AddProducts = () => {
    const {register, handleSubmit, setFocus, formState: {errors} , reset} = useForm()
    const [image, setImage] = useState([])
    const [imagePreview, setImagePreview] = useState([])
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
    const handleImageChange = (e) => {
      console.log('invoked');
      setImagePreview([])
      
       const files = Array.from(e.target.files);
       setImage(files)
      console.log(files);
    
      // setImageFile(file);
      const imagePreview = files.map((file) => URL.createObjectURL(file))
      setImagePreview((prev) => [...prev, ...imagePreview])
    //  const reader = new FileReader();

    //   reader.onloadend = () => {
    //     setImagePreview(...reader.result);
    //   };
     
    //   files.forEach((file) => {
    //     reader.readAsDataURL(file);
    //   })
    
    }
    const {mutate: postProduct} = usePostProductMutation()
    const onSubmit = async (data) => {
       
        
        data.price = Number(data.price)

        // formData is used to parse the file
        // we can also send just the object but need to specify headers content-type to multipart/form-data in api

        const formData = new FormData();
       image.forEach((image) => (
         formData.append('prod_image', image)
       ))
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('category', data.category)
        formData.append('price', data.price)
        formData.append('stock', data.stock)
       
       
        
         
            postProduct(formData, {
              onSuccess(){
                toast.success('Product Added Succesfully')
                reset()
                setImage(null)
                setImagePreview(null)
                //  dispatch(postProducts({data}))
                // navigate('/viewproducts')
              },
              onError(){
                toast.error('Failed to add product')
              }
            })        
    }
    useEffect(() => {
     setFocus('name')
    },[])
  return (
    <div className='min-h-screen flex justify-center items-center bg-orange-600'>
         <form onSubmit={handleSubmit(onSubmit)} className='w-[50%] flex flex-col gap-4 bg-white py-4 px-6 rounded-lg'>
            <h1 className='text-xl font-semibold'>Add Products</h1>
        
          <Input required type='text' placeholder='product name' {...register('name')}/>     
          <textarea className='h-10 w-full rounded-md border px-3 py-2 text-base resize-none ' type='text' placeholder='description' {...register('description')}/>
          {/* <Input type='text' placeholder='category' {...register('category')}/> */}
          <select className='outline-none border-2 px-3 py-2 rounded-md' {...register('category')}>
            {categoryList.map((category) => (
              <option key={category.value} className=''>{category.label}</option>
            ))}
          </select>
          <Input required type='number' placeholder='stock' {...register('stock')}/>
          <Input required type='number' placeholder='price' {...register('price')}/>
       
          <Input
          id="image-upload"
          accept='.png, .jpeg, .jpg' 
          type='file' 
          name='prod_image'
          placeholder='image' 
          multiple
          onChange = {handleImageChange}
          className=''/>
          <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <div className='flex items-center justify-center gap-4'>
                
                 {imagePreview ? imagePreview.map((image) =>  (
                <img
                  src={image}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                  
                />
              )) : (
                <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                </div>
              )}
              </div>
              <span className="text-sm text-muted-foreground">
                Click to upload product image
              </span>
            </label>
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span className='text-red-600'>This field is required</span>}

          <Button className='bg-orange-600'>Submit</Button>
        </form>
    </div>
   
   
  )
}

export default AddProducts