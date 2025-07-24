import { getAllOrders, getOrderOfCurrentUser, postUserOrder, updateOrderStatus, updatePaymentStatus } from "@/services/order"
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
        queryFn: getAllOrders,
        staleTime: 5 * 60 * 1000,
        
    })
}

export const useUpdateOrderStatusMutation = () => {
    return useMutation({
        mutationKey: ['order', 'update-order-status'],
        mutationFn: updateOrderStatus
    })
}
export const useUpdatePaymentStatusMutation = () => {
    return useMutation({
        mutationKey: ['order', 'update-payment-status'],
        mutationFn: updatePaymentStatus
    })
}
export const useDeleteOrderMutation = () => {
    return useMutation({
        mutationKey: ['order', 'delete-order'],
        mutationFn: deleteOrder
    })
}