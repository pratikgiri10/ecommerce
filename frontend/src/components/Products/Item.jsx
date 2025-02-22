import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
 
  import { Button } from '../ui/button'

const Item = ({img}) => {
  return (
    <Card className='bg-white text-black w-[25%]'>
       <CardContent>
           <img className='h-52 w-full object-cover' src={img} alt="" />
        </CardContent>
      <div className='flex justify-between items-baseline'>
      <div>
       <CardHeader className='justify-start items-start'>
            <CardTitle >Laptop</CardTitle>
            <CardDescription className='text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, quas.</CardDescription>
        </CardHeader>
      
       </div>
       <div>
       <CardFooter>
            <p>$99</p>
        </CardFooter>
       </div>
      </div>
      <Button className='w-full bg-orange-600'>Add to Cart</Button>
    </Card>

  )
}

export default Item