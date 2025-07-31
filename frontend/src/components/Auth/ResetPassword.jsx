import React from 'react'
import {motion} from 'motion/react'
import { useForm } from 'react-hook-form'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { usePostResetPasswordMutation } from '@/api/auth'
import { toast } from 'sonner'

const ResetPassword = () => {
    const {handleSubmit, register, setError,formState: {errors}} = useForm({
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    })

    const {mutate: resetPassword} = usePostResetPasswordMutation()
    const handleResetpassword = (data) => {
        console.log(data);
        if(data.password !== data.confirmPassword ){
            setError('password', {match: 'passwords do not match'})
            return
        }
            
        resetPassword(data, {
            onSuccess: () => {
                toast.success('password resetted successfully')
            },
            onError: () => {
                toast.error('failed to reset password')
            }
        })
    }
  return (
    <div className='min-h-screen flex items-center justify-center bg-yellow-500'>
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className='w-full max-w-md'
        >
            <div className=' bg-white p-6 rounded-xl space-y-6'>
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center space-y-2"
                >
                <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold "
                >
                    Create New password
                </motion.h1>
               
                </motion.div>
                <form onSubmit={handleSubmit(handleResetpassword)} className='space-y-4'>
                    <motion.div 
                    className='space-y-2'>
                        <Label>New Password</Label>
                        <Input
                        name='password' 
                        type='password'
                        {...register('password')}
                        />
                    </motion.div>
                    <motion.div
                    className='space-y-2'
                    >
                        <Label>Confirm Password</Label>
                        <Input
                        name='confirmPassword' 
                        type='password'
                        {...register('confirmPassword')}
                        
                        />
                    </motion.div>
                    {errors?.password && <span className='text-sm text-red-500'>{errors.password.match}</span>}
                    <Button className='btn-primary w-full'>Reset Password</Button>
                   
                </form>
            </div>
        </motion.div>
    </div>
  )
}

export default ResetPassword