import Button from '@/components/common/Button'
import ProductImage from '@/components/Products/ProductImage'
import { Search } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const UsersDetail = ({header, title, users, ...props}) => {
  console.log(users);
  
  return (
    <div className='w-full min-h-screen p-4 bg-gradient-to-br from-yellow-50 to-indigo-50 space-y-4'>
         <h1 className='font-medium text-4xl mb-8'>{header}</h1>
        <div className=' grid grid-cols-3 '>
         <div className='col-span-1 w-full'>
          <Link to='/addproducts'>
          <Button children='Add User' className='btn-primary'/>
          </Link>        
       </div>
       <div className='relative col-span-2'>
        <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2 ">
          <Search className=" w-5 h-5 text-gray-400"/>
          
        </span>
        <input
        placeholder="Search"
        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        />
       </div>
       
        </div>
          <table className='bg-white min-w-full rounded-xl overflow-hidden '>
            <thead className=''>
              <tr className='bg-yellow-400'>
                {title.map((title) => (
                    <th key={title} className='p-4 text-left'>{title}</th>
                ))}
                 <th className='p-4 text-left'>Actions</th>
              </tr>
            </thead>
            <tbody className='rounded-b-md'>
            {users?.data.map((user) => (
          <tr  key={users._id} className='bg-white'>
             <td className='p-4'>
              <p className='text-black text-lg'>{user._id}</p>
            </td>
            <td className='p-4 '>              
                <p className='text-black text-lg'>{user.name}</p>
            </td>         
             <td className='p-4'>
              <p className='text-black text-lg'>{user.email}</p>
            </td>
           
            <td className='p-4 text-white'>
              <div className='flex items-center gap-4'>
                <Button children='Edit' className='bg-blue-700 hover:bg-blue-400'/>
                <Button children='Delete' className='bg-red-600 hover:bg-red-400'/>
              </div>
            </td>
             
          </tr>
          ))}
            </tbody>
          </table>
      </div>

  )
}

export default UsersDetail