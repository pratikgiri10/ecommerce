import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const UserOnlyRoutes = ({
    children,
    redirectPath = '/'
}) => {
    const userDetails = useSelector(state => state.auth.userDetails)
    return (
        userDetails.role == 'user' ? children || <Outlet /> : <Navigate to={redirectPath} replace />
    )
}

export default UserOnlyRoutes