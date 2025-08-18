import { useGetProductQuery } from '@/api/product'
import Button from '@/components/common/Button'
import ProductImage from '@/components/Products/ProductImage'
import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Edit3, Package, Search, Trash2 } from 'lucide-react'
import { categoryList } from '@/constants'
import EditProduct from '../ManageProduct/EditProduct'
import AddProducts from '../Forms/AddProducts'

const ViewProducts = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showEditProduct, setShowEditProduct] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { data: productList, isSuccess, isLoading } = useGetProductQuery()

  if (isSuccess)
    console.log(productList);

  const filteredProducts = useMemo(() => {
    if (!productList) return []
    return productList.products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = product.category === categoryFilter || categoryFilter === 'All'
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, productList, categoryFilter])


  return (

    <div className='w-full min-h-screen p-4 bg-gradient-to-br from-yellow-50 to-indigo-50'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='space-y-2'>
        <h1 className='font-bold text-4xl text-gray-900'>Product Management</h1>
        <p className='text-muted-foreground'> Manage and create products</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className=' flex items-center gap-4 mt-8 '>

        <div className='flex-1'>

          <Button
            onClick={() => setShowAddProduct(true)}
            children='Add Product' className='btn-primary' />


        </div>
        <div className='relative flex-1'>
          <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2 ">
            <Search className=" w-5 h-5 text-gray-400" />

          </span>
          <input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none pl-4 pr-8 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >

            <option value="All">All Categories</option>
            {categoryList.map((category) => (
              <option key={category.value} value={category.value}>{category.label}</option>
            ))}
            {/* <option value="Electronics">Electronics</option>
                  <option value="Cameras">Cameras</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Headphones">Headphones</option>
                  <option value="Accessories">Accessories</option> */}
          </select>
          <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-4'>
        <table className='w-full'>
          <thead className='bg-yellow-400 border-b border-gray-100'>
            <tr className=''>
              <th className='p-4 text-left'>Product</th>
              <th className='p-4 text-left'>Category</th>
              <th className='p-4 text-left'>Created At</th>
              <th className='p-4 text-left'>Stock</th>
              <th className='p-4 text-left'>Price</th>
              <th className='p-4 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody className='rounded-b-md'>
            {isSuccess && filteredProducts.map((product) => (
              <tr key={product._id} className='border-b border-gray-50 hover:bg-gray-50 transition-colors'>
                <td className='p-4 '>
                  <div className='flex items-center gap-2'>
                    <ProductImage prod_image={product.imageUrl[0].url} className='w-24' />
                    <div>
                      <h1 className='text-black text-lg'>{product.title}</h1>
                      <p className='text-black text-sm'>{product.description}</p>
                    </div>
                  </div>

                </td>
                <td className='p-4'>
                  <p className='text-black text-lg'>{product.category}</p>
                </td>
                <td className='p-4'>
                  <p className='text-black text-lg'>{new Date(product.createdAt).toLocaleDateString()}</p>
                </td>
                <td className='p-4'>
                  <p className='text-black text-lg'>{product.stock}</p>
                </td>

                <td className='p-4'>
                  <p className='text-black text-lg'>{product.priceAfterDiscount}</p>
                </td>
                <td className='p-4 '>
                  <div className='flex items-center'>
                    <Button
                      onClick={() => {
                        setSelectedProduct(product)
                        setShowEditProduct(true)
                      }}
                      children={<Edit3 className="w-4 h-4" />} className='p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors' />
                    <Button children={<Trash2 className="w-4 h-4" />} className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors' />
                  </div>
                </td>

              </tr>
            ))}

          </tbody>
        </table>
        {showAddProduct &&
          <AddProducts
            setShowAddProduct={setShowAddProduct}
          />
        }
        {showEditProduct &&
          <EditProduct
            setShowEditProduct={setShowEditProduct}
            selectedProduct={selectedProduct}
            categoryFilter={categoryFilter}
          />
        }

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No products found matching your criteria</p>
          </div>
        )}
        {/*loading overlay  */}

        {isLoading && (
          <div className='fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-40'>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading Products...</p>
            </div>
          </div>

        )}

      </motion.div>
    </div>

  )
}

export default ViewProducts