import React from 'react'
import { AppSidebar } from './Sidebar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '../ui/input'
import PostForm from './PostForm'


const ManageProducts = () => {
  return (
   <div className='flex flex-wrap py-4 px-6 justify-center items-center min-h-screen bg-orange-600'>
    <PostForm/>
   </div>
  )
}

export default ManageProducts