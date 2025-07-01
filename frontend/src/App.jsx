import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Cart from './components/Cart/Cart'
import Carts from './components/Cart/Carts'
import Checkout from './components/Cart/Checkout'
import Product from './pages/Product'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ProtectedRoute from './components/protected/ProtectedRoute'
import { AppSidebar } from './components/Dashboard/Sidebar'
import Dashboard from './components/Dashboard/Dashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import ManageProducts from './components/Dashboard/ManageProduct/ManageProducts'
import ManageUsers from './components/Dashboard/ManageUsers/ManageUsers'
import ViewProducts from './components/Dashboard/Tables/ViewProducts'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { login } from '@/features/auth/authSlice'
import { useEffect } from 'react'
import AddProducts from './components/Dashboard/Forms/AddProducts'
import PlaceOrder from './components/order/PlaceOrder'
import { OrderData } from './components/order/OrderData'
import AddressInfo from './components/Auth/AddressInfo'
import OrderHistory from './components/order/OrderHistory'


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_DOMAIN}/users/session`,{
      withCredentials: true
    }).then((response) => {
      if(response.data.success){
        dispatch(login(response.data.data.email))
      }
      else{
        dispatch(logout())
      }
     
    })
  },[])

  return (
  
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/sidebar' element={<AppSidebar />}></Route>
          <Route path='/dashboard' element={<AdminDashboard />}></Route>
          <Route path='/manageproducts' element={<ManageProducts />}></Route>
          <Route path='/manageusers' element={<ManageUsers />}></Route>
          <Route path='/addproducts' element={<AddProducts />}></Route>
          <Route path='/viewproducts' element={<ViewProducts />}></Route>
          <Route path='/placeorder' element={<OrderData />}></Route>
          <Route path='/address' element={<AddressInfo />}></Route>
          <Route path='/orderhistory' element={<OrderHistory />}></Route>
          

          <Route element={<ProtectedRoute />}>
            <Route path='/cart' element={<Carts />}></Route>
            <Route path='/checkout' element={<Checkout />}></Route>
          </Route>
          
          <Route path='/product' element={<Product />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </Router>
  
  )
}

export default App
