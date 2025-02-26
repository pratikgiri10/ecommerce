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


function App() {


  return (
  
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>

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
