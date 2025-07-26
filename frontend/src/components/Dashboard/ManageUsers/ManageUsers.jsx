import React, { useEffect, useState } from 'react'
import UsersDetail from '../Tables/UsersDetail'
import axios from 'axios'
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