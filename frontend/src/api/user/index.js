import { getAllUsersDetails, getCurrentUserDetails, getUserAddress } from "@/services/user"
import { useQuery } from "@tanstack/react-query"

export const useGetCurrentUserQuery = () => {
    return useQuery({
        queryKey: ['user', 'current-user'],
        queryFn: async () => {
            return await (
                await getCurrentUserDetails().data
            )
        }
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