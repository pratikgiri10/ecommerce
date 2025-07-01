import { postProductDetails } from "@/services/product"
import { useMutation } from "@tanstack/react-query"

export const usePostProductMutation = () => {
    return useMutation({
        mutationFn: (data) => postProductDetails(data)
    })
}