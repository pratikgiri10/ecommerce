import { useGetProductQuery } from '@/api/product'
import Button from '@/components/common/Button'
import ProductImage from '@/components/Products/ProductImage'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Search} from 'lucide-react'

const ViewProducts = () => {
   const {data: productList, isSuccess} = useGetProductQuery()
  if(isSuccess)
    console.log(productList);
    
  
  return (
   
      <div className='w-full min-h-screen p-4 bg-gradient-to-br from-yellow-50 to-indigo-50'>
         <h1 className='font-medium text-4xl'>Products</h1>
        <div className=' flex items-center gap-4 mt-8'>
         
         <div className='flex-1'>
        <Link to='/addproducts'>
        <Button children='Add Products' className='btn-primary'/>
        </Link>
        
       </div>
       <div className='relative flex-1'>
        <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2 ">
          <Search className=" w-5 h-5 text-gray-400"/>
          
        </span>
        <input
        placeholder="Search"
        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        />
       </div>
       
        </div>
         <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-4'>
            <table className='w-full'>
            <thead className='bg-yellow-400 border-b border-gray-100'>
              <tr className=''>
                <th className='p-4 text-left'>Product</th>
                <th className='p-4 text-left'>Category</th>
                <th className='p-4 text-left'>Created At</th>
                <th className='p-4 text-left'>Stock</th>
                <th className='p-4 text-left'>Price</th>
                <th className='p-4 text-left'>Actions</th>
              </tr>
            </thead>
            <tbody className='rounded-b-md'>
            {productList?.data?.data?.products?.map((product) => (
          <tr  key={product.$id} className='border-b border-gray-50 hover:bg-gray-50 transition-colors'>
            <td className='p-4 '> 
              <div className='flex items-center gap-2'>
                <ProductImage prod_image={product.imageUrl[0].url} className='w-24'/>              
                <div>
                  <h1 className='text-black text-lg'>{product.title}</h1>
                  <p className='text-black text-sm'>{product.description}</p>
                </div>  
              </div>         
                          
            </td>         
            <td className='p-4'>
              <p className='text-black text-lg'>{product.category}</p>
            </td>
            <td className='p-4'>
              <p className='text-black text-lg'>{new Date(product.createdAt).toLocaleDateString()}</p>
            </td>
            <td className='p-4'>
              <p className='text-black text-lg'>{product.stock}</p>
            </td>
            
            <td className='p-4'>
              <p className='text-black text-lg'>{product.price}</p>
              </td>         
            <td className='p-4 '>
             <div className='flex items-center gap-4'>
                 <Button children='Edit' className='bg-blue-700 text-white hover:bg-blue-400'/>
                  <Button children='Delete' className='bg-red-600 text-white hover:bg-red-400'/>
             </div>
            </td>
             
          </tr>
          ))}
            </tbody>
          </table>
         </div>
      </div>

  )
}

export default ViewProducts