import React from 'react'
import { Button } from '../ui/button'
import { useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '@/api/product';

const ProductDetails = () => {
    const { id } = useParams();
    console.log(id);
    
   const {data, isLoading, isError} = useGetProductByIdQuery(id)
   const product = data?.data.data
   
    if(isLoading) return (<div className='p-8 text-lg'>Loading...</div>)
    if (isError || !product) return <p className='p-8 text-red-600'>Failed to load product.</p>;
    
  return (
    //wrapper for details page
   <main className='px-12 py-8 w-full flex justify-between gap-12'>
    {/* left section */}
    <section className='flex flex-col gap-4 w-full md:w-2/3'>
        {/* image  container*/}
        <div className='w-full h-auto '>
            <img className='w-full h-auto object-cover rounded-lg shadow' src={product.imageUrl?.[0]?.url} alt={product.title} />
        </div>
        {/* button container */}
        <div className='flex gap-4 '>
           <Button size='lg' className=' flex-1 text-md bg-blue-600 hover:bg-blue-700 transition'>Buy Now</Button>
           <Button size='lg' className='bg-orange-600 hover:bg-orange-700 flex-1 text-md transition'>Add to Cart</Button>
        </div>
    </section>
    {/* right section */}
    <section className='w-full md:w-1/3 '>
        {/* product details */}
        <div className='flex flex-col gap-8'>
            <h1 className='text-3xl font-bold'>{product.title}</h1>
            <p className='text-2xl text-gray-700'>{product.description}</p>
            <h2 className='text-2xl font-medium text-orange-600'>{product.price}</h2>
        </div>
    </section>
   </main>
  )
}

export default ProductDetails