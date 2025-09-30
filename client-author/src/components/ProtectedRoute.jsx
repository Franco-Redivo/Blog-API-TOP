import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom"
import LoadingSpinner from "./LoadingSpinner"

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  
  if (isLoading) {
    return <LoadingSpinner />
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute