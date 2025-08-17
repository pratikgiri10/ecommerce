import React from 'react'
import { AppSidebar } from '../components/Dashboard/Sidebar'
import ViewProducts from '../components/Dashboard/Tables/ViewProducts'


const ManageProducts = () => {
  return (
    <div className='flex'>
      <AppSidebar />
      <ViewProducts />
    </div>
  )
}

export default ManageProducts