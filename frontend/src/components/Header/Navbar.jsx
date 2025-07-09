import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ShoppingCart } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '@/features/auth/authSlice';
import { clearCart, loadUserCart } from '@/features/cart/cartSlice';
import { useGetCurrentUserQuery } from '@/api/user';
// import {username} from '../../features/auth/authSlice'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  
    const navigate = useNavigate();
    const dispatch = useDispatch()

    // const {
    //   data: currentAuthenticatedUser, 
    //   isSuccess: isCurrentAuthenticatedUserFetchSuccess, 
    //   isError: isCurrentAuthenticatedUserFetchFailure, error} = useGetCurrentUserQuery()

  return (
    <div className='px-6 py-3 h-20 '>
         <nav className="bg-transparent text-black  flex justify-center items-center gap-28 ">     

      {/* Desktop Links */}
      <div className="hidden md:flex gap-10 font-medium items-center">
        <NavLink to='/' className={({isActive}) => 
        `${ isActive ? 'text-gray-600':'text-black hover:underline hover:underline-offset-8' } text-base `
        }> Home</NavLink>
        <NavLink to='/product' className={({isActive}) => 
        `${isActive ? 'text-gray-600':'text-black  hover:underline hover:underline-offset-8' } `
        }> Products</NavLink>
      
      </div>
       {/* Logo */}
      <div className="text-2xl font-bold text-yellow-500">DigitalDokan</div>
      <div className="hidden md:flex gap-4">
        <div 
         onClick={() => {
          isLoggedIn ? navigate('/cart') : navigate('/login')
        }} 
        className='flex items-center gap-2'>
          <ShoppingCart color='black' size={24}/>
          <Button
          
          className="text-base text-black p-0" variant="link">Cart</Button>
        </div>
        
       {!isLoggedIn ?  <Button 
        onClick={() => {
         
          navigate('/login')
        }} 
        className="text-base btn-primary" variant="ghost">Login</Button>:  <Button 
        onClick={() => {
          dispatch(clearCart())
          dispatch(logout())
          //TODO - clear the localStorage and make api call to clear the access token
         
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