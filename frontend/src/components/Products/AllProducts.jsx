import { useGetProductQueryByCategory } from '@/api/product'
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
import { Package } from 'lucide-react'

const AllProducts = () => {
    const [filters, setFilters] = useState({
        category: '',
        page: 1,
        limit: 2
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
        {products?.products.length === 0 && (
           <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No products found matching your criteria</p>
            </div>
        )}
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
               {/* Page numbers */}
              {Array.from({ length: pagination.totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href="#"
                      isActive={filters.page === pageNum}
                      onClick={(e) => {
                        e.preventDefault()
                        setFilters((prev) => filters.page !== pageNum ? {...prev, page:pageNum} : prev);
                        
                       
                      }}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
             {/* */}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              {/* next btn */}
              <PaginationItem>
                <PaginationNext 
                // href="#" 
                onClick={() => (
                  setFilters((prev) => filters.page < pagination.totalPages ? {...prev, page:prev.page+1} : prev)
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