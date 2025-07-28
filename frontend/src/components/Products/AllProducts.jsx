import { useGetProductQuery } from '@/api/product'
import React, { useState } from 'react'
import Loading from '../common/Loading'
import Item from './Item'
import Filter from './Filter'

const AllProducts = () => {
    const [filters, setFilters] = useState({
        category: ''
    })
    const {data: products, isPending, isError} = useGetProductQuery(filters)
   
        
  return (
   <section className='min-h-screen'>
   
     <div className='max-w-7xl mx-auto flex flex-col gap-12 px-4 sm:px-12'> 
        <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-medium text-yellow-500'>All Products</h1>
             <Filter filters={filters} setFilters={setFilters}/>
        </div>    
        <div className='flex gap-4 overflow-hidden'>
            
            {isPending? <Loading /> : (isError ?  <p className="text-center text-muted-foreground">
          Error fetching products
        </p> : (products.products === 0 ? <p className="text-center text-muted-foreground mt-6">
          No products found.
        </p> :  
        (<div className={`grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 transition-transform duration-300 ease-in-out`}>
            {products?.products.map((product) => (              
                     
              <Item item={product} />        
              
                
            ))}
            </div>))) 
           
            }
        </div>
        
      </div>
   </section>
    
  )
}

export default AllProducts