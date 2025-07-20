import { postUserOrder } from "@/services/order"
import { useMutation } from "@tanstack/react-query"

export const usePostOrderMutation = () => {
    return useMutation({
        mutationKey: ['order', 'shipping-address'],
        mutationFn: (data) => postUserOrder(data)
    })
}