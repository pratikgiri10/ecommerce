import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '@/features/auth/authSlice';
// import {username} from '../../features/auth/authSlice'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const navigate = useNavigate();
    const dispatch = useDispatch()
  return (
    <div>
         <nav className="bg-orange-600 text-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold">EShop</div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-4">
        <Button 
        onClick={() => {
          navigate('/')
        }}
        className="text-xl text-white" variant="link">Home</Button>
        <Button 
         onClick={() => {
          navigate('/product')
        }}
        className="text-xl text-white" variant="link">Products</Button>
      </div>
      <div className="hidden md:flex gap-4">
        <div 
         onClick={() => {
          isLoggedIn ? navigate('/cart') : navigate('/login')
        }} 
        className='flex items-center gap-2'>
          <ShoppingCart color='white' size={26}/>
          <Button
          
          className="text-xl text-white p-0" variant="link">Cart</Button>
        </div>
        
       {!isLoggedIn ?  <Button 
        onClick={() => {
          navigate('/login')
        }} 
        className="text-xl" variant="ghost">Login</Button>:  <Button 
        onClick={() => {
          dispatch(logout())
          navigate('/')
        }} 
        className="text-xl" variant="ghost">Logout</Button> }
      </div>

      {/* Mobile Menu Button */}
      <Button
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
      Click
      </Button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-md md:hidden flex flex-col items-center py-4 gap-3">
          <Button variant="ghost" onClick={() => setIsOpen(false)}>Home</Button>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>Products</Button>
        </div>
      )}
    </nav>

    </div>
  )
}

export default Navbar