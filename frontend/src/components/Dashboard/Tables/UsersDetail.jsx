import { useGetAllUsersQuery } from '@/api/user'
import Button from '@/components/common/Button'
import { Edit3, Package, Search, Trash2 } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import EditUser from '../ManageUsers/EditUser'

const UsersDetail = ({header, title, ...props}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showEditUser, setShowEditUser] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
    const {data: users, isSuccess, isLoading} = useGetAllUsersQuery()
  // console.log(users);
  const filteredUsers = useMemo(() => {
    if(!users) return []
    return users.filter((user) => {
      const matchesUser = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user._id.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesUser
    })
  }, [searchTerm, users])
  
  return (
    <div className='w-full min-h-screen p-4 bg-gradient-to-br from-yellow-50 to-indigo-50 space-y-4'>
         <h1 className='font-medium text-4xl mb-8'>Users</h1>
        <div className=' grid grid-cols-3 '>
         <div className='col-span-1 w-full'>
          <Link to='/addproducts'>
          <Button children='Add User' className='btn-primary'/>
          </Link>        
       </div>
       <div className='relative col-span-2'>
        <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2 ">
          <Search className=" w-5 h-5 text-gray-400"/>
          
        </span>
        <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        />
       </div>
       
        </div>
          <table className='bg-white min-w-full rounded-xl overflow-hidden '>
            <thead className=''>
              <tr className='bg-yellow-400'>
                {title.map((title) => (
                    <th key={title} className='p-4 text-left'>{title}</th>
                ))}
                 <th className='p-4 text-left'>Actions</th>
              </tr>
            </thead>
            <tbody className='rounded-b-md'>
            {isSuccess && filteredUsers.map((user) => (
          <tr  key={user._id} className='bg-white'>
             <td className='p-4'>
              <p className='text-black text-lg'>{user._id}</p>
            </td>
            <td className='p-4 '>              
                <p className='text-black text-lg'>{user.name}</p>
            </td>         
             <td className='p-4'>
              <p className='text-black text-lg'>{user.email}</p>
            </td>
             <td className='p-4'>
              <p className='text-black text-lg'>{user.role}</p>
            </td>
           
            <td className='p-4 text-white'>
              <div className='flex items-center'>
                <Button 
                onClick={() => {
                  setShowEditUser(true)
                  setSelectedUser(user)
                }}
                children={ <Edit3 className="w-4 h-4" />} className='p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors'/>
                <Button children={<Trash2 className="w-4 h-4" />} className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'/>
              </div>
            </td>
             
          </tr>
          ))}
            </tbody>
          </table>
          {showEditUser && 
          <EditUser
          selectedUser={selectedUser}
          setShowEditUser={setShowEditUser}
          />}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No users found matching your criteria</p>
            </div>
          )}
          {isLoading && (
            <div className='fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-40'>
               <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading Users...</p>
              </div>           
            </div>
          )}
      </div>

  )
}

export default UsersDetail