import './App.css'
import { useContext } from 'react'
import Home from './Pages/Home'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SigninForm from './Pages/SigninForm'
import SignupForm from './Pages/SignupForm'
import Dashboard from './Pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import {AuthContext} from './Context/AuthContext'

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Routes>
      
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SigninForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
