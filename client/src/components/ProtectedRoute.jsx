import { Navigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'

import { AuthContext } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  if (loading) {
    return <div>Loading authentication state...</div>
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute