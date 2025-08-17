import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { ShoppingCart } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '@/features/auth/authSlice';
import { clearCart } from '@/features/cart/cartSlice';
import { useGetCurrentUserQuery } from '@/api/user';
import { toast } from 'sonner';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: currentUser, isSuccess, isError } = useGetCurrentUserQuery()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {

    if (isSuccess) {
      dispatch(login(currentUser))
    }

  }, [currentUser, isSuccess, isError, login])


  return (
    <div className='px-6 py-3 h-20 '>
      <nav className="bg-transparent text-black  flex justify-center items-center gap-28 ">

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 font-medium items-center">
          <NavLink to='/' className={({ isActive }) =>
            `${isActive ? 'text-gray-600' : 'text-black hover:underline hover:underline-offset-8'} text-base `
          }> Home</NavLink>
          <NavLink to='/product' className={({ isActive }) =>
            `${isActive ? 'text-gray-600' : 'text-black  hover:underline hover:underline-offset-8'} `
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
            <ShoppingCart color='black' size={24} />
            <Button

              className="text-base text-black p-0" variant="link">Cart</Button>
          </div>

          <div
            onClick={() => {
              isLoggedIn ? navigate('/orderhistory') : navigate('/login')
            }}
            className='flex items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package2-icon lucide-package-2"><path d="M12 3v6" /><path d="M16.76 3a2 2 0 0 1 1.8 1.1l2.23 4.479a2 2 0 0 1 .21.891V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.472a2 2 0 0 1 .211-.894L5.45 4.1A2 2 0 0 1 7.24 3z" /><path d="M3.054 9.013h17.893" /></svg>
            <Button

              className="text-base text-black p-0" variant="link">Orders</Button>
          </div>

          {!isLoggedIn ? <Button
            onClick={() => {

              navigate('/login')
            }}
            className="text-base btn-primary" variant="ghost">Login</Button> : <Button
              onClick={() => {
                dispatch(clearCart())
                dispatch(logout())
                localStorage.clear('accessToken')
                //TODO - clear the localStorage and make api call to clear the access token

                navigate('/')
              }}
              className="text-base" variant="destructive">Logout</Button>}
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