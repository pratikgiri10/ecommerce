import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { StatsCard } from './StatsCard'

const Dashboard = () => {
  return (
   
   <div className='flex items-center gap-4 p-6'>
     <StatsCard title='Total Users' value='10'/>
     <StatsCard  title='Total Products' value='50'/>
     <StatsCard  title='Total Order' value='20'/>
   </div>
      
   
  )
}

export default Dashboard