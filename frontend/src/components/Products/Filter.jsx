import { categoryList } from '@/constants'
import React, { useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Filter = ({filters, setFilters}) => {
  useEffect(() => {
    console.log(filters.category);
    
  },[filters])
  return (
   <Select
   value={filters.category}
   onValueChange={(value) => setFilters((prev) => ({...prev, category: value}))
    }
   >
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {categoryList.map(({value, label}) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
        </SelectContent>
    </Select>
  )
}

export default Filter