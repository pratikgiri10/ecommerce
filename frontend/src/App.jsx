import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import '../src/css/style.css'
import Home from './pages/Home'
import Carts from './components/Cart/Carts'
import Checkout from './components/Cart/Checkout'
import Product from './pages/Product'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ProtectedRoute from './routes/protectedRoutes/ProtectedRoute'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import ManageProducts from './components/Dashboard/ManageProduct/ManageProducts'
import ManageUsers from './components/Dashboard/ManageUsers/ManageUsers'
import ViewProducts from './components/Dashboard/Tables/ViewProducts'
import AddProducts from './components/Dashboard/Forms/AddProducts'
import PlaceOrder from './components/order/PlaceOrder'
import AddressInfo from './components/Auth/AddressInfo'
import OrderHistory from './components/order/OrderHistory'
import ProductDetails from './components/Products/ProductDetails'
import Review from './components/review/Review'
import ManageOrders from './components/Dashboard/ManageOrders/ManageOrders'
import ForgotPassword from './components/Auth/ForgotPassword'
import ResetPassword from './components/Auth/ResetPassword'
import ChangePassword from './components/profile/ChangePassword'
import { useAuth } from './hooks/useAuth'
import UserOnlyRoutes from './routes/permissionRoutes/UserOnlyRoutes'
import AdminOnlyRoutes from './routes/permissionRoutes/AdminOnlyRoutes'



function App() {

  const { isAuthenticated } = useAuth()


  return (

    <Router>
      <Routes>


        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated()} />}>

          <Route path='/resetpassword/:token' element={<ResetPassword />}></Route>
          <Route path='/changepassword' element={<ChangePassword />}></Route>


          <Route element={<UserOnlyRoutes />}>
            <Route path='/cart' element={<Carts />}></Route>
            <Route path='/checkout' element={<Checkout />}></Route>
            <Route path='/placeorder' element={<PlaceOrder />}></Route>
            <Route path='/orderhistory' element={<OrderHistory />}></Route>
            <Route path='/reviews' element={<Review />}></Route>
          </Route>

          <Route element={<AdminOnlyRoutes />}>
            {/* <Route path='/sidebar' element={<AppSidebar />}></Route> */}
            <Route path='/dashboard' element={<AdminDashboard />}></Route>
            <Route path='/manageproducts' element={<ManageProducts />}></Route>
            <Route path='/manageusers' element={<ManageUsers />}></Route>
            <Route path='/addproducts' element={<AddProducts />}></Route>
            <Route path='/manageorders' element={<ManageOrders />}></Route>
            <Route path='/viewproducts' element={<ViewProducts />}></Route>
          </Route>

        </Route>

        <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
        <Route path='/product' element={<Product />}></Route>
        <Route path='/productdetails/:id' element={<ProductDetails />}></Route>

        <Route path='/address' element={<AddressInfo />}></Route>

      </Routes>
    </Router>

  )
}

export default App
