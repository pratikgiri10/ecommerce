import { getProductById, getProductDetails, postProductDetails } from "@/services/product"
import { useMutation, useQuery } from "@tanstack/react-query"

export const usePostProductMutation = () => {
    return useMutation({
        mutationKey: ['add_product'],
        mutationFn: (data) => postProductDetails(data)
    })
}
export const useGetProductQuery = (filters=null) => {
    return useQuery({
        queryKey: ['fetchProducts'],
        queryFn:  () => getProductDetails(filters),
        refetchOnWindowFocus: true
        
    })
}
export const useGetProductByIdQuery = (id) => {
    return useQuery({
        queryKey: ['fetchProductsById'],
        queryFn: () => getProductById(id)
    })
}