import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { authApi } from "@/apis/auth"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/store/hooks"
import { startLoading, stopLoading } from "@/store/slices/loadingSlice"
import { useNotification } from "@/hooks/notification"
import { LoginRequest } from "@/types/auth"
import { FILES_PATH } from "@/constants/path"
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { error } = useNotification()
  const [input, setInput] = useState<LoginRequest>({
    email: "",
    password: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      dispatch(startLoading('Logging in...'))
      const result = await authApi.login(input)
      if(!result.succeed){
        error(result.message)
      } else {
        navigate(FILES_PATH.files)
      }
    } catch (err) {
      error('Invalid email or password')
    } finally {
      dispatch(stopLoading())
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={input.email}
                  onChange={(e) => setInput({ ...input, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={input.password}
                  onChange={(e) => setInput({ ...input, password: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full cursor-pointer">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4 cursor-pointer" onClick={() => navigate("/signup")}>
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
