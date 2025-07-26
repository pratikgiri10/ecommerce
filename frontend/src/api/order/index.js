import { deleteOrder, getAllOrders, getOrderOfCurrentUser, postUserOrder, updateStatus} from "@/services/order"
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

export const useUpdateStatusMutation = () => {
    return useMutation({
        mutationKey: ['order', 'update-status'],
        mutationFn: ({id, data}) => updateStatus(id, data)
    })
}

export const useDeleteOrderMutation = () => {
    return useMutation({
        mutationKey: ['order', 'delete-order'],
        mutationFn: (id) => deleteOrder(id)
    })
}