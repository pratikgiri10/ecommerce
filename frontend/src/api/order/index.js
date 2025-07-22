import { getAllOrders, getOrderOfCurrentUser, postUserOrder } from "@/services/order"
import { useMutation, useQuery } from "@tanstack/react-query"

export const usePostOrderMutation = () => {
    return useMutation({
        mutationKey: ['order', 'create-order'],
        mutationFn: (data) => postUserOrder(data)
    })
}
export const useGetOrderQuery = () => {
    return useQuery({
        queryKey: ['order', 'get-order'],
        queryFn: getOrderOfCurrentUser
    })
}

export const useGetAllOrdersQuery = () => {
    return useQuery({
        queryKey: ['order', 'get-all-orders'],
        queryFn: getAllOrders
    })
}