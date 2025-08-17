import { useGetCurrentUserQuery } from '@/api/user'
import Loader from '@/components/common/Loader'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminOnlyRoutes = ({
    redirectPath = '/',
    children
}) => {
    const { data: userDetails, isSuccess, isLoading } = useGetCurrentUserQuery()
    if (isLoading)
        return <Loader />

    return (
        isSuccess && userDetails.role == 'admin' ? children || <Outlet /> : <Navigate to={redirectPath} replace />
    )

}

export default AdminOnlyRoutes