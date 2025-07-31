import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AddressInfo from '../Auth/AddressInfo'
import { selectTotalDiscountedPrice } from '@/features/selectors/cartSelector'


const Checkout = () => {
     const dispatch = useDispatch()
     const navigate = useNavigate()
//     const [discount, setDiscount] = useState(100)
    const [total, setTotal] = useState()

    const date = new Date(new Date().getTime()+ (3*24*60*60*1000));
    const items = useSelector(state => state.cart.items)
    let totalPrice = items.reduce((acc, item) => acc+item.price*item.quantity,0)
     // const {data: address} = useGetUserAddressQuery()
    const handleCheckout = async () => {
     navigate('/placeorder')
         
         
    }
    const discountedPrice = useSelector(selectTotalDiscountedPrice)
//     const discountedPrice = useMemo(() => {        
//      return totalPrice = totalPrice - discount   
//     }, [totalPrice])

    useEffect(()=> {
     setTotal(totalPrice)   
     
    },[totalPrice])
  return (
    <div className='border border-gray-200 rounded-2xl px-4 py-6 bg-white w-[500px] max-h-fit'>
        <h1 className='text-xl font-bold' >Summary</h1>
        <div className='flex flex-col gap-6 px-6 py-4'>
          
           {/* <div className='flex items-center gap-4'>
               <h2 className='text-lg font-medium'>Delivery Date: </h2>
               <p>{date.toDateString()}</p>
           </div> */}
           
          
           <div className='flex flex-col gap-6'>               
               <div className='flex items-center justify-between '>
                    <h2 className='text-lg'>Subtotal</h2>
                    <p>{total}</p>
               </div>
               {/* <div className='flex items-center justify-between'>
                    <h2 className='text-lg'>Discount</h2>
                    <p>{discount}</p> 
               </div> */}
               <div className='flex border-t-2 items-center justify-between'>
                    <h2 className='text-lg'>Total</h2>
                    <p>{discountedPrice}</p> 
               </div>
           </div>
           <AddressInfo orderPrice={discountedPrice}/>
           {/* <Button 
        onClick={handleCheckout}
        className='btn-primary w-full text-lg'>Proceed to Checkout</Button> */}
        </div>
       
    </div>
  )
}

export default Checkout