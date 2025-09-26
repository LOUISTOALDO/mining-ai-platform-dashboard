"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, Mail, Crown, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"

interface LoginFormProps {
  onLogin?: (email: string, password: string) => void
  isLoading?: boolean
}

export function LoginForm({ onLogin, isLoading = false }: LoginFormProps) {
  const { login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [loginError, setLoginError] = useState("")

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}
    
    // Relaxed validation for demo - just check if fields are not empty
    if (!email) {
      newErrors.email = "Email is required"
    }
    
    if (!password) {
      newErrors.password = "Password is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nuclearLoginBypass = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")
    
    console.log('🚀🚀🚀 NUCLEAR LOGIN BYPASS STARTING 🚀🚀🚀')
    console.log('🚀🚀🚀 NUCLEAR LOGIN BYPASS STARTING 🚀🚀🚀')
    console.log('🚀🚀🚀 NUCLEAR LOGIN BYPASS STARTING 🚀🚀🚀')
    console.log('🔥🔥🔥 WHITE BACKGROUND CONFIRMS NEW CODE 🔥🔥🔥')
    console.log('🔥🔥🔥 WHITE BACKGROUND CONFIRMS NEW CODE 🔥🔥🔥')
    console.log('🔥🔥🔥 WHITE BACKGROUND CONFIRMS NEW CODE 🔥🔥🔥')
    
    if (validateForm()) {
      // NUCLEAR AUTHENTICATION - COMPLETELY BYPASS EVERYTHING
      console.log('🔥🔥🔥 NUCLEAR AUTH STARTING 🔥🔥🔥')
      console.log('🔥🔥🔥 NUCLEAR AUTH STARTING 🔥🔥🔥')
      console.log('🔥🔥🔥 NUCLEAR AUTH STARTING 🔥🔥🔥')
      
      // Set token directly in localStorage
      const token = 'nuclear-bypass-token-' + Date.now()
      localStorage.setItem('auth_token', token)
      
      // Set user data directly in localStorage
      const userData = {
        id: 1,
        email: email,
        username: 'NuclearUser',
        full_name: 'Nuclear Demo User',
        name: 'Nuclear Demo User',
        avatar: undefined,
        is_active: true,
        is_superuser: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
        roles: ['admin']
      }
      localStorage.setItem('user_data', JSON.stringify(userData))
      
      console.log('✅✅✅ NUCLEAR AUTH SUCCESSFUL ✅✅✅')
      console.log('✅✅✅ NUCLEAR AUTH SUCCESSFUL ✅✅✅')
      console.log('✅✅✅ NUCLEAR AUTH SUCCESSFUL ✅✅✅')
      
      // Redirect to dashboard
      console.log('Redirecting to dashboard...')
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4" style={{fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'}}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0 bg-green-500 backdrop-blur-sm border-gray-800">
          <CardHeader className="text-center pb-8">
            <div className="mb-6">
              <span style={{
                fontSize: '1.5rem', 
                fontWeight: '500', 
                color: '#ffffff',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                letterSpacing: '0.01em',
                textShadow: '0 0 12px rgba(255, 255, 255, 0.4), 0 0 24px rgba(255, 255, 255, 0.2)',
                filter: 'blur(0.2px)'
              }}>
                elysium
              </span>
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Sign in to your dashboard
            </CardTitle>
            <p className="text-gray-400 mt-2">
              Access your mining operations dashboard
            </p>
            <div className="mt-4 p-3 bg-blue-900/20 border border-blue-800 rounded-md">
              <p className="text-sm text-blue-300">
                Demo Mode: Enter any email and password to access the dashboard
              </p>
            </div>
          </CardHeader>
          
          <CardContent>
            {loginError && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded-md flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <span className="text-sm text-red-300">{loginError}</span>
              </div>
            )}
            
            <form onSubmit={nuclearLoginBypass} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                      "w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-white placeholder-gray-500",
                      errors.email ? "border-red-500 bg-red-900/20" : "border-gray-700 bg-gray-800"
                    )}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={cn(
                      "w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-white placeholder-gray-500",
                      errors.password ? "border-red-500 bg-red-900/20" : "border-gray-700 bg-gray-800"
                    )}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-500 border-gray-600 rounded focus:ring-blue-500 bg-gray-800"
                  />
                  <span className="ml-2 text-sm text-gray-400">Remember me</span>
                </label>
                <a href="#" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-600">
            © 2024 elysium. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
