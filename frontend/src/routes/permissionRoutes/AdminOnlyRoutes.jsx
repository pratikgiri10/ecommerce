import React from 'react'
import { useSelector } from 'react-redux'

const AdminOnlyRoutes = ({
    redirectPath = '/',
    children
}) => {
    const userDetails = useSelector(state => state.auth.userDetails)
    return (
        userDetails.role == 'admin' ? children || <Outlet /> : <Navigate to={redirectPath} replace />
    )

}

export default AdminOnlyRoutes