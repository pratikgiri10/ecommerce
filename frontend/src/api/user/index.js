import { getAllUsersDetails, getCurrentUserDetails, getUserAddress, updateDefaultAddress, updateUser } from "@/services/user"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetCurrentUserQuery = () => {
    return useQuery({
        queryKey: ['user', 'current-user'],
        queryFn: getCurrentUserDetails
    })
}
export const useGetAllUsersQuery = () => {
    return useQuery({
        queryKey: ['user', 'all-users'],
        queryFn: getAllUsersDetails        
        
    })
}

export const useGetUserAddressQuery = () => {
    return useQuery({
        queryKey: ['user', 'default-address'],
        queryFn: getUserAddress
    })
}
export const useUpdateUserMutation = () => {
    return useMutation({
        mutationKey: ['user', 'update-user'],
        mutationFn: ({id, data}) => updateUser(id, data)
    })
}
export const useUpdateDefaultAddressMutation = () => {
    return useMutation({
        mutationKey: ['user', 'default-address'],
        mutationFn: (data) => updateDefaultAddress(data)
    })
}