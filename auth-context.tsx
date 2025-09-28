"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: number
  email: string
  username: string
  full_name: string
  is_active: boolean
  is_superuser: boolean
  created_at: string
  updated_at?: string
  last_login?: string
  roles: string[]
}

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  // Simple token validation
  const isTokenValid = (token: string): boolean => {
    try {
      // Accept mock tokens for demo purposes
      if (token.startsWith('mock-token-')) {
        return true
      }
      // Basic JWT token validation - check if it has 3 parts separated by dots
      const parts = token.split('.')
      return parts.length === 3
    } catch {
      return false
    }
  }

  // Check for existing token on mount
  useEffect(() => {
    // Check if this is a logout request
    const urlParams = new URLSearchParams(window.location.search)
    const shouldLogout = urlParams.get('logout')
    
    if (shouldLogout === 'true') {
      // Clear all auth data
      setToken(null)
      setUser(null)
      setIsLoading(false)
      localStorage.removeItem('auth_token')
      // Remove the logout parameter from URL
      window.history.replaceState({}, document.title, window.location.pathname)
      console.log('Logout requested - cleared auth data')
      return
    }
    
    // Check for existing token in localStorage
    const existingToken = localStorage.getItem('auth_token')
    if (existingToken && isTokenValid(existingToken)) {
      setToken(existingToken)
      
      // Handle mock tokens
      if (existingToken.startsWith('mock-token-')) {
        console.log('🔄 MOCK TOKEN DETECTED - Loading mock user data')
        const storedUserData = localStorage.getItem('user_data')
        if (storedUserData) {
          try {
            const userData = JSON.parse(storedUserData)
            setUser(userData)
            setIsLoading(false)
            console.log('✅ Mock user data loaded from localStorage')
          } catch (error) {
            console.error('Error parsing mock user data:', error)
            setIsLoading(false)
          }
        } else {
          setIsLoading(false)
        }
      } else {
        // Handle real API tokens
        fetch(`${API_BASE_URL}/users/me`, {
          headers: {
            'Authorization': `Bearer ${existingToken}`,
          },
        })
        .then(response => {
          if (response.ok) {
            return response.json()
          }
          throw new Error('Failed to fetch user info')
        })
        .then(userData => {
          setUser(userData)
          setIsLoading(false)
        })
        .catch(() => {
          setToken(null)
          setUser(null)
          setIsLoading(false)
          localStorage.removeItem('auth_token')
        })
      }
    } else {
      setToken(null)
      setUser(null)
      setIsLoading(false)
    }
    
    console.log('Auth context initialized - user:', user, 'token:', existingToken ? 'exists' : 'none', 'isLoading:', isLoading)
    console.log('URL params:', window.location.search)
    console.log('Should logout:', urlParams.get('logout'))
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('🚀 MOCK AUTHENTICATION - Bypassing API completely')
    console.log('📧 Email:', email)
    console.log('🔒 Password length:', password.length)
    
    // Simulate a brief loading delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Accept ANY credentials - this is pure mock authentication
    if (email && password) {
      console.log('✅ MOCK LOGIN SUCCESSFUL - Any credentials accepted')
      
      // Generate a mock token
      const mockToken = `mock-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      console.log('🎫 Generated token:', mockToken)
      
      // Create mock user data
      const mockUser = {
        id: 1,
        email: email,
        username: email.split('@')[0] || 'demo',
        full_name: 'Demo User',
        name: 'Demo User',
        avatar: undefined,
        is_active: true,
        is_superuser: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
        roles: ['admin']
      }
      console.log('👤 Created user:', mockUser)
      
      // Set authentication state
      setToken(mockToken)
      setUser(mockUser)
      localStorage.setItem('auth_token', mockToken)
      localStorage.setItem('user_data', JSON.stringify(mockUser))
      
      console.log('💾 Stored in localStorage - token and user data')
      setIsLoading(false)
      console.log('🎉 Login function returning true')
      return true
    }
    
    console.log('❌ Login failed - missing email or password')
    setIsLoading(false)
    return false
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    setToken(null)
    setUser(null)
  }

  const refreshUser = async () => {
    if (!token) {
      return
    }

    console.log('🔄 MOCK REFRESH USER - Using stored mock data')
    
    // For mock authentication, just use the stored user data
    const storedUserData = localStorage.getItem('user_data')
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData)
        setUser(userData)
        console.log('✅ Mock user data refreshed from localStorage')
      } catch (error) {
        console.error('Error parsing stored user data:', error)
      }
    }
  }

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    logout,
    refreshUser,
  }
  
  // Debug logging
  console.log('Auth Context State:', { 
    hasUser: !!user, 
    hasToken: !!token, 
    isAuthenticated: !!user && !!token,
    isLoading 
  })

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
