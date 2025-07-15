import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAddress } from '@/features/auth/authSlice'
import AddressInfo from '../Auth/AddressInfo'
import { useGetUserAddressQuery } from '@/api/user'

const Checkout = ({price, items}) => {
     const dispatch = useDispatch()
     const navigate = useNavigate()
    const [discount, setDiscount] = useState(100)
    const [total, setTotal] = useState()

    const date = new Date(new Date().getTime()+ (3*24*60*60*1000));
     // const {data: address} = useGetUserAddressQuery()
    const handleCheckout = async () => {
     navigate('/placeorder')
          // try{
          //      const response = await axios.get(`${import.meta.env.VITE_DOMAIN}/users/getaddress`,{
          //           withCredentials: true
          //      })
          //      console.log(response.data)
          //      if(response.data.success && response.data.data){
          //           dispatch(setAddress(response.data.data))
          //           navigate('/placeorder')
          //      }
          //      else{
          //           navigate('/address')
          //      }
          // }catch(err){
          //      console.log(err)
          // }
         
    }

    const discountedPrice = useMemo(() => {        
     return price = price - discount   
    }, [price])

    useEffect(()=> {
     setTotal(price)        
    },[price])
  return (
    <div className='border border-gray-200 rounded-2xl px-4 py-6 bg-white w-[500px] max-h-fit'>
        <h1 className='text-xl font-bold' >Summary</h1>
        <div className='flex flex-col gap-6 px-6 py-4'>
          
           {/* <div className='flex items-center gap-4'>
               <h2 className='text-lg font-medium'>Delivery Date: </h2>
               <p>{date.toDateString()}</p>
           </div> */}
           
           {/* <div className='flex flex-col gap-4'>
               {items.map((item) => (
                    
                    <div key={item._id} className='flex items-center justify-between'>
                         <h2 className='text-lg'>{item.title}</h2>
                         <h2>{item.quantity}</h2>
                         <p>{item.price}</p>
               </div>
                    
               ))}
           </div> */}
           <div className='flex flex-col gap-6'>               
               <div className='flex items-center justify-between '>
                    <h2 className='text-lg'>Subtotal</h2>
                    <p>{total}</p>
               </div>
               <div className='flex items-center justify-between'>
                    <h2 className='text-lg'>Discount</h2>
                    <p>{discount}</p>
               </div>
               <div className='flex border-t-2 items-center justify-between'>
                    <h2 className='text-lg'>Total</h2>
                    <p>{discountedPrice}</p> 
               </div>
           </div>
           <AddressInfo />
           {/* <Button 
        onClick={handleCheckout}
        className='btn-primary w-full text-lg'>Proceed to Checkout</Button> */}
        </div>
       
    </div>
  )
}

export default Checkout