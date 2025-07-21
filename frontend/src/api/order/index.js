import { postUserOrder } from "@/services/order"
import { useMutation } from "@tanstack/react-query"

export const usePostOrderMutation = () => {
    return useMutation({
        mutationKey: ['order', 'create-order'],
        mutationFn: (data) => postUserOrder(data)
    })
}