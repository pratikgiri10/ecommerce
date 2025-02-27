import React from 'react'
import { AppSidebar } from './Sidebar'
import Dashboard from './Dashboard'

const AdminDashboard = () => {
  return (
    <div className='flex items-start'>
        <AppSidebar />
        <Dashboard />
    </div>
  )
}

export default AdminDashboard