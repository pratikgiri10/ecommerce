import React from 'react'
import { AppSidebar } from './Sidebar'
import Dashboard from './Dashboard'

const AdminDashboard = () => {
  return (
    <div className='flex'>
        <AppSidebar />
        <Dashboard />
    </div>
  )
}

export default AdminDashboard