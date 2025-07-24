import { useUpdateOrderStatusMutation, useUpdatePaymentStatusMutation } from '@/api/order'
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { XCircle } from 'lucide-react'


import React from 'react'
import { Controller, useForm } from 'react-hook-form'

const EditOrder = ({selectedOrder, setShowEditOrder}) => {

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
            <Select
            defaultValue={selectedOrder.order_status}
            >
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