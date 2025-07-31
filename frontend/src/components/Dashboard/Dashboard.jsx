import React from 'react'
import { StatsCard } from './StatsCard'
import { Boxes, DollarSign, User } from 'lucide-react'
import { useGetAllUsersQuery } from '@/api/user'
import { useGetProductQuery } from '@/api/product'
import { useGetAllOrdersQuery } from '@/api/order'

const Dashboard = () => {

    const {data: users , isSuccess: isUserFetchSuccess} = useGetAllUsersQuery()
    const {data: products, isSuccess: isProductFetchSuccess} = useGetProductQuery()
    const {data: orders, isSuccess: isOrderFetchSuccess} = useGetAllOrdersQuery()
    let data = []
    if(isUserFetchSuccess && isProductFetchSuccess && isOrderFetchSuccess){
      data = [
        {
          label: 'Total Users',
          value: users.length,
          icon: <User />
        },
        {
          label: 'Total Products',
          value: products.products.length,
          icon: <Boxes />
        },
        {
          label: 'Total Orders',
          value: orders.length,
          
        },
        {
          label: 'Total Revenue',
          value: 'Rs. 25000',
          icon: <DollarSign />
        }
      ]
    }


  return (
    <div className='w-full min-h-screen p-6 space-y-6 bg-gradient-to-br from-yellow-50 to-indigo-50'>
      <div className='space-y-2'>
        <h1 className='font-medium text-3xl'>Dashboard</h1>
        <p className='text-muted-foreground'>Summary of overall data</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {data.map((stats) => (
          <StatsCard key={stats.name} stats={stats}/>
        ))}
       
      </div>
      {/* sales analytics */}
      <div>       
      </div>
      {/* top products */}
      
    </div>
   
   
      
   
  )
}

export default Dashboard