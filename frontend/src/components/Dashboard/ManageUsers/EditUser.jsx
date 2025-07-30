import { useUpdateUserMutation } from '@/api/user'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useQueryClient } from '@tanstack/react-query'
import { XCircle } from 'lucide-react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const EditUser = ({selectedUser, setShowEditUser}) => {
    const form = useForm()
    const {handleSubmit, control} = useForm( {
        defaultValues: {
            name: selectedUser.name,
            email: selectedUser.email,
            role: selectedUser.role
        }
    })
   const {mutate: updateUserDetails} = useUpdateUserMutation()
   const queryClient = useQueryClient()
    const handleEditUser = (data) => {
        console.log(data);
        const updatedData = {
            id: selectedUser._id,
            data
        }
        updateUserDetails(updatedData, {
            onSuccess: (data) => {
                toast.success('User Updated Successfully')
                queryClient.setQueryData(['user', 'all-users'], (oldUser) => {
                    return oldUser.map((user) => user._id === data._id ? {...user, ...data} : user)
                })
                setShowEditUser(false)
            },
            onError: () => {
                toast.error('Failed to update user')
            }
        })
        
    }
  return (
    <div 
    onClick={() => setShowEditUser(false)}
    className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-6 z-50'>
       <div 
       onClick={(e) => e.stopPropagation()}
       className='relative bg-white p-4 rounded-xl w-full max-w-md'>
        <button 
        onClick={() => setShowEditUser(false)}
        className='absolute top-0 right-0 p-2 hover:bg-gray-100 rounded-lg transition-colors'>
             <XCircle className="w-6 h-6 text-gray-500" />
        </button>
        <h1 className='text-foreground font-semibold text-xl mb-2'>Edit User Details</h1>
         <Form {...form}>
            <form onSubmit={handleSubmit(handleEditUser)} className='space-y-4'>
                <div>              
                    <FormField
                        control={control}
                        name="name"
                        render={({field}) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                            <FormControl>
                            { /* Your form field */}
                            <Input
                            type='text' 
                            placeholder='enter your fullname'
                            {...field}
                            />
                            </FormControl>
                        </FormItem>
                        )}
                    />               
                </div>
                 <div>              
                    <FormField
                        control={control}
                        name="email"
                        render={({field}) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                            <FormControl>
                            { /* Your form field */}
                            <Input
                            type='email' 
                            placeholder='enter your email'
                            {...field}
                            />
                            </FormControl>
                        </FormItem>
                        )}
                    />               
                </div>
                <div>
                    <FormField 
                    control={control}
                    name='role'
                    render = {({field}) => (                       
                        <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        >
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder='Role'/>
                            </SelectTrigger>                            
                            </FormControl>
                            <SelectContent>
                                <SelectItem value='user'>User</SelectItem>
                                <SelectItem value='admin'>Admin</SelectItem>
                            </SelectContent>
                        </Select>

                        </FormItem>
                              
                    )}
                    />
                   
                  
                   
                </div>
                <button className='btn-primary w-full rounded p-2'>Update</button>
            </form>
         </Form>
       </div>
    </div>
  )
}

export default EditUser