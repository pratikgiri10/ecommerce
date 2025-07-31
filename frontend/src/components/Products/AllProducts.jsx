import { useGetProductQuery, useGetProductQueryByCategory } from '@/api/product'
import React, { useState } from 'react'
import Loading from '../common/Loading'
import Item from './Item'
import Filter from './Filter'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const AllProducts = () => {
    const [filters, setFilters] = useState({
        category: '',
        page: 1,
        limit: 12
    })
    const {data: products, isPending, isError, error, isSuccess} = useGetProductQueryByCategory(filters)
   const pagination = products?.pagination
   
   if(isError)
    console.log(error);
    
        
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
                     
              <Item key={product._id} item={product} />        
              
                
            ))}
            </div>))) 
           
            }
        </div>
        {pagination && (
          <Pagination>
            <PaginationContent>
              {/* previous btn */}
              <PaginationItem>
                <PaginationPrevious 
                // href="#" 
                onClick={() => (
                  setFilters((prev) => filters.page !== 1 ? {...prev, page:prev.page-1} : prev)
                )}
                />
              </PaginationItem>
              {/* page numbers */}
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
             {/* */}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              {/* next btn */}
              <PaginationItem>
                <PaginationNext 
                // href="#" 
                onClick={() => (
                  setFilters((prev) => filters.page < pagination.totalPages && {...prev, page:prev.page+1})
                )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          // <div className='flex items-center gap-4 mt-8'>
          //   <button 
          //   // onClick={handlePrevClick}
          //   className='bg-black px-4 py-2 text-white'>Prev</button>
          //   <h3>{pagination.page}</h3>
          //   <button 
          //   // onClick={handleNextClick}
          //   className='bg-black px-4 py-2 text-white'>Next</button>
          // </div>
        )}
        
      </div>
   </section>
    
  )
}

export default AllProducts