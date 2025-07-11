import { categoryList } from '@/constants'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Filter = ({filters, setFilters}) => {
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
            {categoryList.map(({value, label}) => (
                <SelectItem value={value}>{label}</SelectItem>
            ))}
        </SelectContent>
    </Select>
  )
}

export default Filter