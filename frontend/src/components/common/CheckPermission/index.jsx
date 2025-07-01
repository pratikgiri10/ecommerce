import React from 'react'

const CheckPermission = ({
    permission,
    permissionModule,
    children,
    fallback
}) => {
    const hasPermission = useCheckPermission(permission, permissionModule)
  return children
}

export default CheckPermission