import React from 'react'
import { AppSidebar } from '../components/Dashboard/Sidebar'
import Orders from '../components/Dashboard/ManageOrders/Orders'

const ManageOrders = () => {
  return (
    <div className='flex'>
      <AppSidebar />
      <Orders />
    </div>
  )
}

export default ManageOrders