import { useGetCurrentUserQuery } from '@/api/user'
import Loader from '@/components/common/Loader'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const UserOnlyRoutes = ({
    children,
    redirectPath = '/'
}) => {

    const { data: userDetails, isSuccess, isLoading } = useGetCurrentUserQuery()
    if (isLoading)
        return <Loader />


    return (
        isSuccess && userDetails?.role == 'user' ? children || <Outlet /> : <Navigate to={redirectPath} replace />
    )
}

export default UserOnlyRoutes