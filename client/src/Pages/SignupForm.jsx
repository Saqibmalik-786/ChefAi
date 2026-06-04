// Signup.jsx

import './AuthForm.css'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Mail, Lock, User } from 'lucide-react'

const Signup = () => {
  const { signInWithGoogle} = useContext(AuthContext);
  const handleSignupWithGoogle = () => {
    try{
      signInWithGoogle();
      // Redirect to dashboard after successful sign-up
    }
    catch(error){
      console.error("Error signing up with Google:", error);  
    }
  }
  return (
    <section className="auth-section">
      <div className="auth-container">

        <div className="auth-header">
          <h2>Create Your Account</h2>

          <p>
            Join ChefAI and generate AI-powered recipes instantly.
          </p>
        </div>

        <form className="auth-form">

          <div className="input-group">
            <User size={20} />
            <input
              type="text"
              placeholder="Full Name"
            />
          </div>

          <div className="input-group">
            <Mail size={20} />
            <input
              type="email"
              placeholder="Email Address"
            />
          </div>

          <div className="input-group">
            <Lock size={20} />
            <input
              type="password"
              placeholder="Password"
            />
          </div>

          <button className="auth-btn">
            Create Account
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="google-btn"
            onClick={handleSignupWithGoogle}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
            />

            Continue with Google
          </button>

        </form>

        <p className="auth-footer">
          Already have an account?
          <span> Sign In</span>
        </p>

      </div>
    </section>
  )
}

export default Signup