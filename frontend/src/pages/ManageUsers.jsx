import React from 'react'
import UsersDetail from '../components/Dashboard/Tables/UsersDetail'
import { AppSidebar } from '../components/Dashboard/Sidebar'

const ManageUsers = () => {
  const title = ['Id', 'Name', 'Email', 'Role']


  return (
    <div className='flex'>
      <AppSidebar />
      <UsersDetail title={title} />
    </div>
  )
}

export default ManageUsers