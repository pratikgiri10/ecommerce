import React from 'react'
import { StatsCard } from './StatsCard'
import { Boxes, DollarSign, User } from 'lucide-react'
import { useGetAllUsersQuery } from '@/api/user'
import { useGetProductQuery } from '@/api/product'
import { useGetAllOrdersQuery } from '@/api/order'
import { CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const Dashboard = () => {

  const { data: users, isSuccess: isUserFetchSuccess } = useGetAllUsersQuery()
  const { data: products, isSuccess: isProductFetchSuccess } = useGetProductQuery()
  const { data: orders, isSuccess: isOrderFetchSuccess } = useGetAllOrdersQuery()
  let data = []
  if (isUserFetchSuccess && isProductFetchSuccess && isOrderFetchSuccess) {
    data = [
      {
        label: 'Total Users',
        value: 5000,
        icon: <User />
      },
      {
        label: 'Total Products',
        value: 2000,
        icon: <Boxes />
      },
      {
        label: 'Total Orders',
        value: 500,

      },
      {
        label: 'Total Revenue',
        value: 'Rs. 2500000',
        icon: <DollarSign />
      }
    ]

  }
  const salesData = [
    {
      month: 'Jan',
      sales: '20'
    },
    {
      month: 'Feb',
      sales: '15'
    },
    {
      month: 'March',
      sales: '25'
    },
    {
      month: 'April',
      sales: '50'
    },
    {
      month: 'May',
      sales: '150'
    },
    {
      month: 'June',
      sales: '200'
    }
  ]
  const salesPerCategory = [
    {
      category: 'Electronics',
      sales: 100,
      fill: '#448844'
    },
    {
      category: 'Laptops',
      sales: 50,
      fill: '#82ca9d'
    },
    {
      category: 'Accessories',
      sales: 75,
      fill: '#8884d8'
    },
    {
      category: 'Cameras',
      sales: 5,
      fill: '#ca4d88'
    },
    {
      category: 'Books',
      sales: 10,
      fill: '#4d88ca'
    },

  ]

  return (
    <div className='w-full min-h-screen p-6 space-y-6 bg-gradient-to-br from-yellow-50 to-indigo-50'>
      <div className='space-y-2'>
        <h1 className='font-medium text-3xl'>Dashboard</h1>
        <p className='text-muted-foreground'>Summary of overall data</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {data.map((stats) => (
          <StatsCard key={stats.name} stats={stats} />
        ))}

      </div>
      <div className='flex'>
        <div>
          {/* sales analytics */}
          <h1>Total Sales</h1>
          <div width={730} height={250}>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={salesData} >
                <XAxis dataKey='month' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type='monotone' dataKey='sales' stroke='#eab308' />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* top product category */}
        <div>
          <h1>Top Products Category</h1>
          <div className='h-[450px] w-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={salesPerCategory}
                  dataKey='sales'
                  nameKey='category'
                  cx='50%'
                  cy='50%'
                  outerRadius={80}
                  innerRadius={60}
                  label

                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>



    </div>




  )
}

export default Dashboard