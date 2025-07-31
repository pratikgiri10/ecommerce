import { getProductById, getProductDetails, postProductDetails, updateProduct } from "@/services/product"
import { useMutation, useQuery } from "@tanstack/react-query"

export const usePostProductMutation = () => {
    return useMutation({
        mutationKey: ['product','add_product'],
        mutationFn: (data) => postProductDetails(data)
    })
}
export const useGetProductQueryByCategory = (filters) => {
    
    return useQuery({
        queryKey: ['product',{filters}],
        queryFn:  () => getProductDetails(filters),
        
    })
}
export const useGetProductQuery = (filters) => {
    
    return useQuery({
        queryKey: ['product', 'fetch-all-products' ],
        queryFn:  () => getProductDetails(filters),
        
    })
}
export const useGetProductByIdQuery = (id) => {
    return useQuery({
        queryKey: ['product','fetch-product'],
        queryFn: () => getProductById(id)
    })
}
export const useUpdateProductMutation = () => {
    return useMutation({
        mutationKey: ['product', 'update-product'],
        mutationFn: ({id, data}) => updateProduct(id, data)
    })
}