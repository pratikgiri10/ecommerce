import React from 'react'
import {motion} from 'motion/react'
import { useForm } from 'react-hook-form'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { usePostForgotPasswordMutation } from '@/api/auth'
import { toast } from 'sonner'


const ForgotPassword = () => {
    const {handleSubmit, register} = useForm({
        defaultValues: {
            email: ''
        }
    })
    const {mutate: forgotpassword} = usePostForgotPasswordMutation()
    const handleForgotPassword = (data) => {
        console.log(data);
        forgotpassword(data, {
            onSuccess: () => {
                 toast.success('email submitted successfully')
            },
            onError: () => {
                 toast.error('failed to submit email')
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
            <div className=' bg-white p-6 rounded-xl'>
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
                    Forgot your password?
                </motion.h1>
                <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground"
                >
                    No worries! Enter your email and we'll send you reset
                    link
                </motion.p>
                </motion.div>
                <form onSubmit={handleSubmit(handleForgotPassword)} className='space-y-4'>
                    <Label>Email</Label>
                    <Input
                    name='email' 
                    type='email'
                    {...register('email')}
                    />
                    <Button className='btn-primary w-full'>Submit</Button>
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="w-full text-center"
                    >
                    <Button
                        variant="link"
                        className="text-sm font-medium"
                        onClick={() => navigate("/login")}
                    >
                        Back to login
                    </Button>
                    </motion.div>
                </form>
            </div>
        </motion.div>
    </div>
  )
}

export default ForgotPassword