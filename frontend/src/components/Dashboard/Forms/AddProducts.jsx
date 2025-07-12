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
import { X } from 'lucide-react';

const AddProducts = () => {
    const {register, handleSubmit, setFocus, formState: {errors} , reset} = useForm()
    const [image, setImage] = useState([])
    const [imagePreview, setImagePreview] = useState([])
    const fileInputRef = useRef()
  
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
      // setImagePreview([])
      
       const files = Array.from(e.target.files);
       setImage((prev) => [...prev,...files])
      fileInputRef.current.value = '';
      // console.log(files);
    
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
    const handleDeselectFile = (index) => {
     console.log('removing');
     
     setImage((prev) => prev.filter((_,i) => i !== index))
     setImagePreview((prev) => prev.filter((_,i) => i !== index))
    console.log(fileInputRef.current.files)
     
     fileInputRef.current.value= ''; 
    }
    useEffect(() => {
     setFocus('name')
    },[])
  return (
    <div className='min-h-screen flex justify-center items-center bg-yellow-500'>
         <form onSubmit={handleSubmit(onSubmit)} className='w-[50%] flex flex-col gap-4 bg-white py-4 px-6'>
            <h1 className='text-xl font-semibold'>Add Products</h1>
        
          <Input required type='text' placeholder='product name' {...register('name')}/>     
          <textarea 
          className='h-40 w-full rounded-md border px-3 py-2 text-base resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500  focus-visible:ring-offset-2' 
          type='text' 
          placeholder='description' 
          {...register('description')}/>
          {/* <Input type='text' placeholder='category' {...register('category')}/> */}
          <select className='outline-none border-2 px-3 py-2 rounded-md' {...register('category')}>
            {categoryList.map((category) => (
              <option value={category.value} key={category.value} className=''>{category.label}</option>
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
          ref={fileInputRef}
          onChange = {handleImageChange}
          className=''/>
          <label
              // htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <div className=' flex items-center justify-center gap-4'>
                
                 {imagePreview ? imagePreview.map((image, index) =>  (
               <div className='relative w-32 h-32'>
                   <img
                  src={image}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                  
                />
                <span
                onClick={() => handleDeselectFile(index)} 
                className='absolute top-1 right-1 text-red-500 hover:bg-red-100 hover:rounded-full'> <X /></span>
               </div>
              )) : null
              // (
              //   <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
              //   </div>
              // )
              }
             
              </div>
              {/* <span className="text-sm text-muted-foreground">
                Click to upload product image
              </span> */}
            </label>
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span className='text-red-600'>This field is required</span>}

          <Button className='btn-primary'>Submit</Button>
        </form>
    </div>
   
   
  )
}

export default AddProducts