import { useGetCurrentUserQuery } from '@/api/user'
import Loader from '@/components/common/Loader'
import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const AdminOnlyRoutes = ({
    redirectPath = '/',
    children
}) => {
    const navigate = useNavigate()
    const { data: userDetails, isSuccess, isLoading, isError } = useGetCurrentUserQuery()
    if (isError) {
        toast.error('session has expired')
        localStorage.clear('accessToken')
        return navigate('/login')
    }
    if (isLoading)
        return <Loader />

    return (
        isSuccess && userDetails.role == 'admin' ? children || <Outlet /> : <Navigate to={redirectPath} replace />
    )

}

export default AdminOnlyRoutes