import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '@/api/product';

import Review from '../review/Review';
import { setToCart } from '@/features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '@/hooks/useAuth';

const ProductDetails = () => {
    const [selectedImage, setSelectedImage] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams();

    const status = useAuth()



    const { data, isLoading, isError, isSuccess } = useGetProductByIdQuery(id)
    const product = data?.data.data
    console.log(product);
    const addToCart = (e) => {
        // e.stopPropagation()
        console.log(product);
        if (status) {
            dispatch(setToCart(product))
            navigate('/cart')
        }
        else {
            navigate('/login')
        }

    }

    if (isLoading) return (<div className='p-8 text-lg'>Loading...</div>)
    if (isError || !product) return <p className='p-8 text-red-600'>Failed to load product.</p>;


    return (
        //wrapper for details page
        <main className='container min-h-screen bg-gray-50'>
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <div className='grid lg:grid-cols-3 gap-12'>
                    {/* left section */}
                    <section className='lg:col-span-2 flex flex-col gap-8'>

                        <div className='flex space-x-4'>
                            {/* image thumbnail */}
                            <div className='flex flex-col space-y-4'>
                                {product?.imageUrl?.map((image, index) => (
                                    <button
                                        className={`w-20 h-20 rounded-lg border-2  overflow-hidden flex-shrink-0 ${selectedImage == index ? 'border-blue-500' : 'border-gray-400'}`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img
                                            className=' w-full h-full object-cover '
                                            src={image.url}
                                            alt={product.title} />
                                    </button>
                                ))}
                            </div>
                            {/* image  container*/}
                            <div className='overflow-hidden rounded-xl shadow-xl'>
                                <img className='w-full h-96 lg:h-[500px] object-cover' src={product.imageUrl?.[selectedImage]?.url} alt={product.title} />
                            </div>
                        </div>
                        {/* button container */}
                        <div className='flex gap-4 ml-24'>
                            <Button size='lg' className='flex-1 text-md bg-blue-600 hover:bg-blue-700 transition'>Buy Now</Button>
                            <Button
                                onClick={addToCart}
                                size='lg' className='flex-1 btn-primary text-md transition'>Add to Cart</Button>
                        </div>
                    </section>
                    {/* right section */}
                    <section className='lg:col-span-1'>
                        {/* product details */}
                        <div className='flex flex-col gap-4'>
                            <div>
                                <span className='text-sm font-medium bg-blue-200 text-blue-800 rounded-full px-3 py-1'>{product.category}</span>
                            </div>
                            <div>
                                <h1 className='text-2xl font-bold text-gray-900'>{product.title}</h1>
                            </div>
                            <div>
                                <p className='text-xl text-gray-700'>{product.description}</p>
                            </div>
                            <div>
                                <h2 className='text-xl font-medium'>Rs.{product.price}</h2>
                            </div>
                            <div>
                                <span className='text-sm font-medium bg-green-200 text-green-800 rounded-full px-3 py-1'>{product.stock} in stock</span>
                            </div>


                        </div>
                    </section>
                </div>
                {/* customer reviews */}
                <div className='border border-gray-200 shadow-md rounded-2xl mt-12 w-full'>
                    <div className='p-4'>
                        <h1 className='text-2xl font-semibold text-gray-800'>Customer Review</h1>
                    </div>
                    <Review
                        prodId={id}
                    />
                </div>

            </div>
        </main>


    )
}

export default ProductDetails