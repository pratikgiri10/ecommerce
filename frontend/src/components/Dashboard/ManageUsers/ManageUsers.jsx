import React, { useEffect, useState } from 'react'
import UsersDetail from '../Tables/UsersDetail'
import axios from 'axios'
import { AppSidebar } from '../Sidebar'
import { useGetAllUsersQuery } from '@/api/user'

const ManageUsers = () => {
    const title = ['id','name', 'email']

    const {data: users, isSuccess} = useGetAllUsersQuery()
    if(isSuccess)
    console.log(users);
    
    // useEffect(() => {
    //     const getUsers = async () => {
    //         const users = await axios.get(`${import.meta.env.VITE_DOMAIN}/users/getusers`,{
    //             withCredentials: true
    //         })
    //         if(users){
    //             console.log(users);
                
    //             // setUsers(users.data.data)
    //         }
           
    //     }
    //     getUsers()
    // },[])
  return (
    <div className='flex items-center justify-between'>
        <AppSidebar />
        <UsersDetail users={users?.data} header='Users' title={title}/>
    </div>
  )
}

export default ManageUsers