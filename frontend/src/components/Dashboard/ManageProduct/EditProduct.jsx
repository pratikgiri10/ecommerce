import { useUpdateProductMutation } from '@/api/product'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { categoryList } from '@/constants'
import { useQueryClient } from '@tanstack/react-query'
import { XCircle } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const EditProduct = ({setShowEditProduct,selectedProduct}) => {
  const form = useForm()
  const {handleSubmit, control} = useForm({
    defaultValues: {
      title: selectedProduct.title,
      description: selectedProduct.description,
      price: selectedProduct.price,
      discountPercentage: selectedProduct.discountPercentage,
      category: selectedProduct.category,
      stock: selectedProduct.stock,
    }
  })
  const {mutate: updateProduct} = useUpdateProductMutation()
  const queryClient = useQueryClient()
  const handleEditProduct = (data) => {
    console.log(data);
    const updatedData = {
      id: selectedProduct._id,
      data
    }
    updateProduct(updatedData, {
      onSuccess: (data) => {
        toast.success('Product updated successfully')
        console.log(data);
        queryClient.setQueryData(['product', 'fetch-all-products'], (oldProduct) => {
        const updateProduct = (oldProduct.products.map((product) => product._id === data._id ? {...product, ...data} : product))        
        return {
          products: updateProduct
        }  
        })
        setShowEditProduct(false)
        
      },
      onError: (error) => {
        toast.error('Failed to update product')
        console.log(error);
        
      }
    })
    
  }
  return (
    <div 
    onClick={() => setShowEditProduct(false)}
    className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div 
      onClick={(e) => e.stopPropagation()}
      className='relative bg-white w-full max-w-xl p-6 rounded-xl'>
         <button 
        onClick={() => setShowEditProduct(false)}
        className='absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors'>
             <XCircle className="w-6 h-6 text-gray-500" />
        </button>
        <h1 className='text-foreground font-semibold text-xl mb-2'>Edit Product Details</h1>
          <Form {...form}>
            <form onSubmit={handleSubmit(handleEditProduct)} className='space-y-4'>
                <div>
                  <FormField 
                  control={control}
                  name='title'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input 
                        type='text'
                        placeholder='enter the name of product'
                        {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                  />
                </div>
                <div>
                  <FormField 
                  control={control}
                  name='description'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                        placeholder='type your product description'
                         {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                  />
                </div>
                <div>
                  <FormField 
                  control={control}
                  name='price'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Price(NPR)</FormLabel>
                      <FormControl>
                        <Input 
                        type='text'
                        placeholder='enter the price of product'
                         {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                  />
                </div>
                <div>
                  <FormField 
                  control={control}
                  name='discountPercentage'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Discount(%)</FormLabel>
                      <FormControl>
                        <Input 
                        type='number'
                        placeholder='enter the discount percentage of product'
                         {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                  />
                </div>
                 <div>
                  <FormField 
                  control={control}
                  name='category'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      >
                         <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='categories' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {categoryList.map(({value, label}) => (
                                <SelectItem value={value}>{label}</SelectItem>
                            ))} 
                        </SelectContent> 
                      </Select> 
                     
                    </FormItem>
                  )}
                  />
                </div>
                <div>
                  <FormField 
                  control={control}
                  name='stock'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input 
                        type='number'
                        placeholder='enter the number of product in the stock'
                         {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                  />
                </div>
                <Button className='btn-primary w-full'>Update</Button>
            </form>
        </Form>
      </div>
      
    </div>
  )
}

export default EditProduct