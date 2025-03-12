import service from '@/appwrite/config'
import Button from '@/components/Button'
import ProductImage from '@/components/Products/ProductImage'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ViewProducts = () => {
  const [items, setItems] = useState([])
  useEffect(() => {
    service.getProds().then((items) => {
      setItems(items.documents)
    })
   
  },[])
  useEffect(() => {
    console.log(items)
  },[items])
  return (
   
      <div className='w-full min-h-screen p-4'>
         <h1 className='font-medium text-4xl'>Products</h1>
        <div className=' flex items-center gap-4 mt-4'>
         
       <div className='relative flex-1'>
        <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2 ">
          <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-current text-gray-500"
          >
            <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
          </svg>
        </span>
        <input
        placeholder="Search"
        className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none  dark:bg-gray-800 dark:border-gray-700  dark:text-white"
        />
       </div>
       <div className='flex-1'>
        <Link to='/addproducts'>
        <Button children='Add Products' className='hover:bg-orange-400'/>
        </Link>
        
       </div>
        </div>
          <table className='min-w-full mt-4'>
            <thead className=''>
              <tr className='bg-gray-300 rounded-t-md'>
                <th className='p-4 text-left'>Product</th>
                <th className='p-4 text-left'>Category</th>
                <th className='p-4 text-left'>Created At</th>
                <th className='p-4 text-left'>Stock</th>
                <th className='p-4 text-left'>Price</th>
                <th className='p-4 text-left'>Actions</th>
              </tr>
            </thead>
            <tbody className='rounded-b-md'>
            {items?.map((item) => (
          <tr  key={item.$id} className='bg-gray-100'>
            <td className='p-4 '> 
              <div className='flex items-center gap-2'>
                <ProductImage prod_image={item.prod_image} className='w-24'/>              
                <div>
                  <h1 className='text-black text-lg'>{item.prod_name}</h1>
                  <p className='text-black text-sm'>{item.prod_description}</p>
                </div>  
              </div>         
                          
            </td>         
            <td className='p-4'>
              <p className='text-black text-lg'>no</p>
            </td>
            <td className='p-4'>
              <p className='text-black text-lg'>no</p>
            </td>
            <td className='p-4'>
              <p className='text-black text-lg'>no</p>
            </td>
            <td className='p-4'>
              <p className='text-black text-lg'>{item.price}</p>
              </td>         
            <td className='p-4 flex items-center gap-4'>
              <Button children='Edit' className='bg-blue-700 hover:bg-blue-400'/>
              <Button children='Delete' className='bg-red-600 hover:bg-red-400'/>
            </td>
             
          </tr>
          ))}
            </tbody>
          </table>
      </div>

  )
}

export default ViewProducts