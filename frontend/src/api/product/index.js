import { postProductDetails } from "@/services/product"
import { useMutation } from "@tanstack/react-query"

export const usePostProductMutation = () => {
    return useMutation({
        mutationKey: ['add_product'],
        mutationFn: (data) => postProductDetails(data)
    })
}