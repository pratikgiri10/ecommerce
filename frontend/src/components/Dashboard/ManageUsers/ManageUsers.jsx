import React from 'react'
import UsersDetail from '../Tables/UsersDetail'
import { AppSidebar } from '../Sidebar'

const ManageUsers = () => {
    const title = ['Id','Name', 'Email', 'Role']

    
   
    
    
  return (
    <div className='flex'>
        <AppSidebar />
        <UsersDetail title={title}/>
    </div>
  )
}

export default ManageUsers