import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Button } from '../ui/button'
  import { Input } from '../ui/input'
  import axios from 'axios'
import { usePostSignUpMutation } from '@/api/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function Register() {
   
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
          },
    })
    const navigate = useNavigate()
    const {mutate: signUpUser, isPending} = usePostSignUpMutation()
    const onSubmit = async (data) => {
       signUpUser(data, {
        onSuccess: (res) => {
            form.reset()
            navigate('/login')
        },
        onError: (error) => {
            const errorMessage =
            error?.response?.data?.detail || 'An error occurred. Please try again.';
            toast.error(errorMessage);
        }
       })
      };
  return (
   <div className='flex items-center justify-center h-screen bg-black w-full p-0'>
    <div  className='w-[30%] p-4 bg-white rounded-md' >
        <h1 className='text-2xl font-semibold text-center underline underline-offset-8 mb-4 '>Register</h1>
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4 w-full text-left'
            >
                {/* name */}
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem >          
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                        <Input 
                       
                        type='text' placeholder="your name" {...field} />
                        </FormControl>  
                        <FormMessage />
                </FormItem>
                )}
            />
            {/* Email Field */}
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                    <Input 
                    
                    type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            {/* password Field */}
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input 
                    
                    type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button className='bg-black' type="submit" disabled={isPending}>Submit</Button>
            </form>
        </Form>
    </div>
        
   </div>
  )
}

export default Register