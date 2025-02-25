import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { login } from "@/features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(login(username))
    try{
      const response = await axios.post('http://localhost:3000/api/login',{
        username, password
      })
      if(response.data){
        navigate('/')
      }
      else{
        navigate('/login')
      }
    }catch(err){
      console.log(err)
    }
   
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-orange-600">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-2xl px-6 py-4">
        <CardHeader className="text-center p-0">
          <CardTitle className="text-2xl font-semibold underline underline-offset-8">Login</CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="email" placeholder="Enter your email" className="w-full" required />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <Input 
               value={password}
               onChange={(e) => setPassword(e.target.value)}
              type="password" placeholder="Enter your password" className="w-full" required />
            </div>
            <Button 
            onClick={handleLogin}
            className="w-full bg-orange-600 hover:bg-blue-700 text-white py-2 rounded-xl">
              Sign In
            </Button>
          </form>
          <p className="text-sm text-gray-600 text-center mt-4">
            Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Sign Up</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
