// Signin.jsx

import './AuthForm.css'
import { Mail, Lock } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Signin = () => {
  const navigate = useNavigate()
  const { signInWithGoogle, signIn, user } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true })
    }
  }, [user, navigate])

  const handleSignin = async (e) => {
    e.preventDefault()
    setError(null)

    const { error } = await signIn(email, password)
    if (error) {
      setError(error.message)
      return
    }

    navigate('/dashboard', { replace: true })
  }

  const handleSigninWithGoogle = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error('Error signing in with Google:', error)
      setError(error?.message ?? 'Unable to sign in with Google')
    }
  }

  return (
    <section className="auth-section">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue using ChefAI.</p>
        </div>

        <form className="auth-form" onSubmit={handleSignin}>
          <div className="input-group">
            <Mail size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
            />
          </div>

          <div className="input-group">
            <Lock size={20} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-btn">
            Sign In
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <button type="button" className="google-btn" onClick={handleSigninWithGoogle}>
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" />
            Continue with Google
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account?
          <span> Create Account</span>
        </p>
      </div>
    </section>
  )
}

export default Signin