import { useGetCurrentUserQuery } from '@/api/user';
import Loader from '@/components/common/Loader';
import { login } from '@/features/auth/authSlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = ({
  isAuthenticated,
  redirectPath = '/login',
  children
}) => {
  // const dispatch = useDispatch()
  // const { data: currentUser, isSuccess, isPending } = useGetCurrentUserQuery()


  // useEffect(() => {
  //   if (isSuccess && currentUser)
  //     dispatch(login(currentUser))
  // }, [currentUser, login, isSuccess])

  return !isAuthenticated ? <Navigate to={redirectPath} replace /> : children || <Outlet />;
};

export default ProtectedRoute;