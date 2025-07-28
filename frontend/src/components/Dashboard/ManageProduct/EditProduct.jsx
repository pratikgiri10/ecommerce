import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { categoryList } from '@/constants'
import React from 'react'
import { useForm } from 'react-hook-form'

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
  const handleEditProduct = (data) => {
    console.log(data);
    
  }
  return (
    <div 
    onClick={() => setShowEditProduct(false)}
    className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div 
      onClick={(e) => e.stopPropagation()}
      className='bg-white w-full max-w-lg p-6 rounded-xl'>
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
                      <FormLabel>Price</FormLabel>
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