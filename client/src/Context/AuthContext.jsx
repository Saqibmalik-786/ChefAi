import React, { createContext, useState, useEffect } from 'react'
import { supabase } from '../config/Supabaseclient'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Load initial session
    const getInitialSession = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user ?? null)
      setLoading(false)
      setIsAuthenticated(!!data.session?.user)
    }
    getInitialSession()

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
        setIsAuthenticated(!!session?.user)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  // =========================
  // Signup
  // =========================
  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      console.error(error)
      return { data, error }
    }
    setUser(data.user)
    setIsAuthenticated(true)
    return { data, error: null }
  }

  // =========================
  // Signin
  // =========================
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      console.error(error)
      return { data, error }
    }
    setUser(data.user)
    setIsAuthenticated(true)
    return { data, error: null }
  }

  // =========================
  // Google Signin
  // =========================
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${import.meta.env.VITE_API_URL}/dashboard`, // adjust for production
      },
    })
    if (error) console.error(error)
    // No need to setUser here — listener will update after redirect
  }

  // =========================
  // Logout
  // =========================
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
      return { error }
    }
    setUser(null)
    setIsAuthenticated(false)
    return { error: null }
  }



  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
