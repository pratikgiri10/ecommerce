import React from 'react'
import { AppSidebar } from '../components/Dashboard/Sidebar'
import Dashboard from '../components/Dashboard/Dashboard'

const AdminDashboard = () => {
  return (
    <div className='flex'>
      <AppSidebar />
      <Dashboard />
    </div>
  )
}

export default AdminDashboard