import { useUpdateStatusMutation } from '@/api/order'
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useQueryClient } from '@tanstack/react-query'
import { XCircle } from 'lucide-react'


import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const EditOrder = ({selectedOrder, setShowEditOrder}) => {

    const orderStatuses = [
        { name: "Processing", value: "processing" },
        { name: "Shipped", value: "shipped" },
        { name: "Delivered", value: "delivered" },
        { name: "Cancelled", value: "cancelled" },
    ];
    const paymentStatuses = [
        { name: "Pending", value: "pending" },
        { name: "Paid", value: "paid" },
        { name: "Failed", value: "failed" },
    ];
    const {handleSubmit, control} = useForm({
       defaultValues: {
        order_status: selectedOrder.order_status,
        payment_status: selectedOrder.payment_status
       }
    }) 

    const {mutate: changeStatus} = useUpdateStatusMutation()
    const queryClient = useQueryClient()
    const onSubmit = (data) => {
        const changedFields = {}
        // console.log(data);
       for (const key in data){
        if(data[key] !== selectedOrder[key]){
            changedFields[key] = data[key]
            const formData = {
                id: selectedOrder._id,
                data: changedFields
            }
            changeStatus(formData, {
                onSuccess: (data) => {
                    toast.success('Status Updated Successfully')
                    console.log(data.data.data);
                    
                    queryClient.setQueryData(['order', 'get-all-orders'], (oldOrders) => {
                        
                        return (oldOrders?.map((order) => order._id == data.data.data._id ? {...order, order_status: data.data.data.order_status, payment_status: data.data.data.payment_status} : order));
                        
                    })
                    setShowEditOrder(false)
                },
                onError: () => {
                    toast.error('Failed to update status')
                }
            })
            
        }
       }
        
    }
  return (
    <div 
    onClick={() => setShowEditOrder(false)}
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div 
      onClick={(e) => e.stopPropagation() }
      className='relative bg-white p-6 rounded-xl w-full max-w-lg'>
        <button 
        onClick={() => setShowEditOrder(false)}
        className='absolute right-5 p-2 hover:bg-gray-100 rounded-lg transition-colors'>
             <XCircle className="w-6 h-6 text-gray-500" />
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        
        <div className='space-y-4'> 
            <label className='text-foreground font-medium'>Update Order Status</label>           
           <Controller
            name= 'order_status'
            control={control}
            
            render = {({field}) => (
            <Select
            defaultValue={selectedOrder.order_status}
            onValueChange={field.onChange}
            value={field.value}            
            >
                <SelectTrigger className="">
                    <SelectValue placeholder="please select an order status" />
                </SelectTrigger>
                <SelectContent>
                    {orderStatuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>{status.name}</SelectItem>
                    ))}
                    
                    
                </SelectContent>
            </Select>
            )}
           />

        </div>
       <div className='space-y-4'>
            <label className='text-foreground font-medium'>Update Payment Status</label>
            <Controller
            name='payment_status' 
            control={control}
           
            render = {({field}) => (
            <Select
            defaultValue={selectedOrder.payment_status}
            onValueChange={field.onChange}
            value={field.value} 
            
            >
                <SelectTrigger className="">
                    <SelectValue placeholder="please select payment status" />
                </SelectTrigger>
                <SelectContent>
                    {paymentStatuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>{status.name}</SelectItem>
                    ))}
                    
                    
                </SelectContent>
            </Select>
            )}
            />

       </div>
       <button className='btn-primary w-full rounded p-2'>Update</button>
       </form>
      </div>
    </div>
  )
}

export default EditOrder