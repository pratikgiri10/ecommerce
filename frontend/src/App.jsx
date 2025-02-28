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
import ManageProducts from './components/Dashboard/ManageProducts'
import ManageUsers from './components/Dashboard/ManageUsers'
import ViewProducts from './components/Dashboard/ViewProducts'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { login } from '@/features/auth/authSlice'
import { useEffect } from 'react'


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get('http://localhost:3000/api/session',{
      withCredentials: true
    }).then((response) => {
      if(response.data.success){
        dispatch(login(response.data.user))
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
          <Route path='/viewproducts' element={<ViewProducts />}></Route>
          <Route path='/manageusers' element={<ManageUsers />}></Route>
          

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
