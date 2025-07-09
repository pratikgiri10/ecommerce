import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[200px] w-[400px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-[400px]" />
        {/* <Skeleton className="h-8 w-[300px]" /> */}
      </div>
    </div>
  )
}

export default SkeletonCard