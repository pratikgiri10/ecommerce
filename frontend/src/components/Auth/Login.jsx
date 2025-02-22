import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
              <Input type="email" placeholder="Enter your email" className="w-full" required />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
              <Input type="password" placeholder="Enter your password" className="w-full" required />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl">
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
