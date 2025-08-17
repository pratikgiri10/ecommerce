import React from 'react'
import Item from './Item'
import Button from '../common/Button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useGetProductQuery } from '@/api/product'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'



const Product = () => {

  const { data: products, isError, error } = useGetProductQuery()
  if (isError)
    console.log(error);

  return (

    <div className='container'>
      <div className='max-w-7xl mx-auto  my-16 space-y-2'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-semibold'>Recent Products</h1>
          <Link
            to='/product'
          >
            <Button className='text-sm flex items-center text-muted-foreground text-yellow-500 font-medium'>
              <span>View All Products</span>
              <ChevronRight size={18} />
            </Button>

          </Link>
        </div>
        <Carousel
        >
          <CarouselContent>
            {products?.products.map((product) => (
              <CarouselItem key={product._id} className="md:basis-1/2 lg:basis-1/3">
                <Item key={product._id} item={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>


      </div>
    </div>

  )
}

export default Product