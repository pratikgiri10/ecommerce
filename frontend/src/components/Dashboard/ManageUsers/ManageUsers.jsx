import React, { useEffect, useState } from 'react'
import UsersDetail from '../Tables/UsersDetail'
import axios from 'axios'
import { AppSidebar } from '../Sidebar'

const ManageUsers = () => {
    const [users, setUsers] = useState([])
    const title = ['id','name', 'email']
    useEffect(() => {
        const getUsers = async () => {
            const users = await axios.get(`${import.meta.env.VITE_DOMAIN}/users/getusers`,{
                withCredentials: true
            })
            if(users.data.success){
                setUsers(users.data.data)
            }
           
        }
        getUsers()
    },[])
  return (
    <div className='flex items-center justify-between'>
        <AppSidebar />
        <UsersDetail users={users} header='Users' title={title}/>
    </div>
  )
}

export default ManageUsers