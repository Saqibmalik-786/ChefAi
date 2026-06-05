import { useContext, useState } from 'react'
import { ChefHat } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { AuthContext } from '../Context/AuthContext'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useContext(AuthContext)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const handleLogout = async () => {
    await signOut()
    closeMenu()
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
              <li><Link to="/home" onClick={closeMenu}>Home</Link></li>
              <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
              <li>
                <button className="btn-login" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
            <li>
                <Link to="/" onClick={closeMenu}>Home</Link>
            </li>
              <li>
                <Link to="/signin" onClick={closeMenu}>
                  <button className="btn-login">Login</button>
                </Link>
              </li>
              <li>
                <Link to="/signup" onClick={closeMenu}>
                  <button className="btn-signup">Sign Up</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
