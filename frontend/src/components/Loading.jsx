import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import SkeletonCard from './SkeletonCard'


const Loading = () => {
  return (
    <div className='grid grid-flow-row grid-cols-3 place-content-center place-items-center gap-10'>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}

export default Loading