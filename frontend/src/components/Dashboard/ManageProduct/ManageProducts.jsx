import React from 'react'
import { AppSidebar } from '../Sidebar'
import ViewProducts from '../Tables/ViewProducts'


const ManageProducts = () => {
  return (
   <div className='flex'>
    <AppSidebar />
    <ViewProducts />
    {/* <PostForm/> */}
   </div>
  )
}

export default ManageProducts