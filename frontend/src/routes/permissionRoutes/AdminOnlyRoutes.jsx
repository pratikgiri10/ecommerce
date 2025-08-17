import { getUser } from '@/utils/getUser'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminOnlyRoutes = ({

    redirectPath = '/',
    children
}) => {
    const userDetails = useSelector(state => state.auth.userDetails)
    console.log(userDetails);

    return (
        userDetails.role == 'admin' ? children || <Outlet /> : <Navigate to={redirectPath} replace />
    )

}

export default AdminOnlyRoutes