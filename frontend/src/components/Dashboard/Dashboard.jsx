import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { StatsCard } from './StatsCard'

const Dashboard = () => {
  return (
    <div className='w-full min-h-screen p-4 bg-gradient-to-br from-yellow-50 to-indigo-50'>
      <div className='flex items-center gap-4 p-6'>
        <StatsCard title='Total Users' value='10'/>
        <StatsCard  title='Total Products' value='50'/>
        <StatsCard  title='Total Order' value='20'/>
      </div>
    </div>
   
   
      
   
  )
}

export default Dashboard