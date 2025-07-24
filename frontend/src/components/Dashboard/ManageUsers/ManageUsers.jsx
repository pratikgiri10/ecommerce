import React, { useEffect, useState } from 'react'
import UsersDetail from '../Tables/UsersDetail'
import axios from 'axios'
import { AppSidebar } from '../Sidebar'
import { useGetAllUsersQuery } from '@/api/user'

const ManageUsers = () => {
    const title = ['id','name', 'email']

    const {data: users, isSuccess} = useGetAllUsersQuery()
   
    
    
  return (
    <div className='flex items-center justify-between'>
        <AppSidebar />
        {isSuccess && <UsersDetail users={users?.data} header='Users' title={title}/>}
    </div>
  )
}

export default ManageUsers