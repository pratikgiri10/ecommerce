import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { login } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signInUser } from "@/services/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from "@/schemas/auth";
import { toast } from "sonner";

export default function Login() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {form, handleSubmit, register}  = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  // const { getValues, setValues } = form

  const { mutate: signInUserRequest, isPending } = useMutation({
    mutationFn: signInUser,
    onSuccess: (res) => {
      const {data: {data}} = res
      // console.log(data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('accessToken', data.accessToken)
      dispatch(login(data.user.email))
      navigate('/')
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.detail || 'An error occurred. Please try again.';
      toast.error(errorMessage);
    },
  })

  const onSubmit = (values) => {
    signInUserRequest({
      email: values.email,
      password: values.password
    })
    
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-yellow-500">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-2xl px-6 py-4">
        <CardHeader className="text-center p-0">
          <CardTitle className="text-2xl font-semibold underline underline-offset-8">Login</CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <Input
              type="email" placeholder="Enter your email" className="w-full" required  
              {...register('email')}/>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <Input 
              type="password" placeholder="Enter your password" className="w-full" required 
              {...register('password')}/>
            </div>
            <Button
            type = 'submit' 
            className="btn-primary w-full hover:opacity-95 text-white py-2 rounded-xl" disabled={isPending}>
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
