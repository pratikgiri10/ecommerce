import React from 'react'

import PostForm from '../Forms/AddProducts'
import { AppSidebar } from '../Sidebar'
import ViewProducts from '../Tables/ViewProducts'


const ManageProducts = () => {
  return (
   <div className='flex gap-4'>
    <AppSidebar />
    <ViewProducts />
    {/* <PostForm/> */}
   </div>
  )
}

export default ManageProducts