import { useState } from 'react'
import {ChefHat}  from 'lucide-react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import {AuthContext} from '../Context/AuthContext'
import { useContext } from 'react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
    const { user } = useContext(AuthContext)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <ChefHat size={28} />
          <span className="brand-name">ChefAI</span>
        </div>

        <button className="hamburger" onClick={toggleMenu}>
          <span className={isOpen ? 'open' : ''}></span>
          <span className={isOpen ? 'open' : ''}></span>
          <span className={isOpen ? 'open' : ''}></span>
        </button>
      
        <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
          {user ? (
            <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            </>
          ) : (
            <>
           <li><Link to="/">Home</Link></li>
          <Link to="/signin">
              <button className="btn-login">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn-signup">Sign Up</button>
            </Link>
            </>
          )}
        </ul>

        {user ? (
          <div className="navbar-user">
            <li><Link to="/dashboard">Dashboard</Link></li>
            <span>Welcome, {user.email}</span>
          </div>
        ) : (
          <div className="navbar-actions">
            <Link to="/signin">
              <button className="btn-login">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn-signup">Sign Up</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
