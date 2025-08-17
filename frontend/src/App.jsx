import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import '../src/css/style.css'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ProtectedRoute from './routes/protectedRoutes/ProtectedRoute'
import AddProducts from './components/Dashboard/Forms/AddProducts'
import PlaceOrder from './components/order/PlaceOrder'
import AddressInfo from './components/Auth/AddressInfo'
import ProductDetails from './components/Products/ProductDetails'
import ForgotPassword from './components/Auth/ForgotPassword'
import ResetPassword from './components/Auth/ResetPassword'
import ChangePassword from './components/profile/ChangePassword'
import { useAuth } from './hooks/useAuth'
import UserOnlyRoutes from './routes/permissionRoutes/UserOnlyRoutes'
import AdminOnlyRoutes from './routes/permissionRoutes/AdminOnlyRoutes'
import Footer from './components/Footer/Footer'
import Navbar from './components/Header/Navbar'
import { lazy, Suspense } from 'react'
import Loader from './components/common/Loader'

const Home = lazy(() => import('./pages/Home'))
const Product = lazy(() => import('./pages/Product'))
const Cart = lazy(() => import('./pages/Cart'))
const Order = lazy(() => import('./pages/Order'))
const Dashboard = lazy(() => import('./pages/AdminDashboard'))
const ManageOrders = lazy(() => import('./pages/ManageOrders'))
const ManageProducts = lazy(() => import('./pages/ManageProducts'))
const ManageUsers = lazy(() => import('./pages/ManageUsers'))



function App() {
  const { pathname } = useLocation()
  const { isAuthenticated } = useAuth()

  const routesWithoutNavbarFooter = [
    '/login',
    '/register',
    '/resetpassword/:token',
    '/changepassword',
    '/forgotpassword'
  ]
  // const routesWithoutFooter = [
  //   '/login',
  //   '/register',
  //   '/resetpassword/:token',
  //   '/changepassword'
  // ]

  const hideNavbarFooter = routesWithoutNavbarFooter.some((url) => pathname.includes(url))
  // const hideFooter = routesWithoutNavbar.some((url) => pathname.includes(url))


  return (

    <>
      <Suspense fallback={<Loader />}>
        {!hideNavbarFooter && <Navbar />}
        <Routes>

          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated()} />}>

            <Route path='/resetpassword/:token' element={<ResetPassword />}></Route>
            <Route path='/changepassword' element={<ChangePassword />}></Route>


            <Route element={<UserOnlyRoutes />}>
              <Route path='/cart' element={<Cart />}></Route>
              {/* <Route path='/checkout' element={<Checkout />}></Route> */}
              <Route path='/placeorder' element={<PlaceOrder />}></Route>
              <Route path='/orderhistory' element={<Order />}></Route>
              {/* <Route path='/reviews' element={<Review />}></Route> */}
            </Route>

            <Route element={<AdminOnlyRoutes />}>
              {/* <Route path='/sidebar' element={<AppSidebar />}></Route> */}
              <Route path='/dashboard' element={<Dashboard />}></Route>
              <Route path='/manageproducts' element={<ManageProducts />}></Route>
              <Route path='/manageusers' element={<ManageUsers />}></Route>
              <Route path='/addproducts' element={<AddProducts />}></Route>
              <Route path='/manageorders' element={<ManageOrders />}></Route>
              {/* <Route path='/viewproducts' element={<ViewProducts />}></Route> */}
            </Route>

          </Route>

          <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
          <Route path='/product' element={<Product />}></Route>
          <Route path='/productdetails/:id' element={<ProductDetails />}></Route>

          <Route path='/address' element={<AddressInfo />}></Route>

        </Routes>
        {!hideNavbarFooter && <Footer />}
      </Suspense>

    </>
  )
}

export default App
