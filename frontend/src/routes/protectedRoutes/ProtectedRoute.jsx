import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = ({
  isAuthenticated,
  redirectPath = '/login',
  children
}) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [role, setRole] = useState('user')

  // const checkAuth = async () => {
  //   try {
  //     const response = await axios.get(`${import.meta.env.VITE_DOMAIN}/auth/session`, {
  //       withCredentials: true
  //     })
  //     console.log(response)
  //     if (response.data.success) {
  //       localStorage.setItem('userId', JSON.stringify(response.data.data._id))
  //       setRole(response.data.data.role)
  //       return true;
  //     }
  //     return false;
  //   } catch (error) {
  //     console.error('Error checking authentication:', error);
  //     return false;
  //   }
  // };

  // useEffect(() => {
  //   const verifyAuth = async () => {
  //     const isAuth = await checkAuth();
  //     setIsAuthenticated(isAuth);
  //     setLoading(false);
  //   };
  //   verifyAuth();
  // }, []);



  return !isAuthenticated ? <Navigate to={redirectPath} replace /> : children || <Outlet />;
};

export default ProtectedRoute;