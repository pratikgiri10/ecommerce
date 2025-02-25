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

function Register() {
   
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
          },
    })

    const onSubmit = async (data) => {
        // e.preventDefault()
        console.log(data)
        const {name, email, password} = data
        try{
            console.log("Login Data");
            const response = await axios.post('http://localhost:3000/api/register',{
               name, email, password
            })
        }catch(err){
            console.log(err)
        }
       
      };
  return (
   <div className='flex items-center justify-center h-screen bg-orange-600 w-full p-0'>
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
            <Button className='bg-orange-600' type="submit">Submit</Button>
            </form>
        </Form>
    </div>
        
   </div>
  )
}

export default Register