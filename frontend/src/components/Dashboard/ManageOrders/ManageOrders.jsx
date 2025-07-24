import React from 'react'
import { AppSidebar } from '../Sidebar'
import Orders from './Orders'

const ManageOrders = () => {
  return (
    <div className='flex'>
        <AppSidebar />
        <Orders />
    </div>
  )
}

export default ManageOrders