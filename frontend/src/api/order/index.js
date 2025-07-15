import { postShippingAddress } from "@/services/order"
import { useMutation } from "@tanstack/react-query"

export const usePostShippingAddressMutation = () => {
    return useMutation({
        mutationKey: ['order', 'shipping-address'],
        mutationFn: (data) => postShippingAddress(data)
    })
}