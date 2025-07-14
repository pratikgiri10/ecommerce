import { postShippingAddress } from "@/services/order"
import { useMutation } from "@tanstack/react-query"

export const usePostShippingAddressMutation = async () => {
    return useMutation({
        mutationKey: ['order', 'shipping-address'],
        mutationFn: () => postShippingAddress
    })
}