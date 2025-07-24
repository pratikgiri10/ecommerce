import { useUpdateOrderStatusMutation, useUpdatePaymentStatusMutation } from '@/api/order'
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'

import React from 'react'
import { Controller, useForm } from 'react-hook-form'

const EditOrder = ({selectedOrder}) => {

    const orderStatus = [
        { name: "Processing", value: "processing" },
        { name: "Shipped", value: "shipped" },
        { name: "Delivered", value: "delivered" },
        { name: "Cancelled", value: "cancelled" },
    ];
    const paymentStatus = [
        { name: "Pending", value: "pending" },
        { name: "Paid", value: "paid" },
        { name: "Failed", value: "failed" },
    ];
    const {handleSubmit, control} = useForm() 

    const {data: changeOrderStatus} = useUpdateOrderStatusMutation()
    const {data: changePaymentStatus} = useUpdatePaymentStatusMutation()
    const onSubmit = () => {

    }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className='bg-white p-4 rounded-xl w-full max-w-xl'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        
        <div className='space-y-4'> 
            <label className='text-foreground font-medium'>Update Order Status</label>           
            <Select>
                <SelectTrigger className="">
                    <SelectValue placeholder="please select an order status" />
                </SelectTrigger>
                <SelectContent>
                    {orderStatus.map((status) => (
                        <SelectItem value={status.value}>{status.name}</SelectItem>
                    ))}
                    
                    
                </SelectContent>
            </Select>

        </div>
       <div className='space-y-4'>
            <label className='text-foreground font-medium'>Update Payment Status</label>
            <Select>
                <SelectTrigger className="">
                    <SelectValue placeholder="please select payment status" />
                </SelectTrigger>
                <SelectContent>
                    {paymentStatus.map((status) => (
                        <SelectItem value={status.value}>{status.name}</SelectItem>
                    ))}
                    
                    
                </SelectContent>
            </Select>

       </div>
       <button className='btn-primary w-full rounded p-2'>Update</button>
       </form>
      </div>
    </div>
  )
}

export default EditOrder