import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import PostsDashboard from './pages/postsDashboard'
import Login from './pages/Login'
import NavBar from './components/NavBar'
import ProtectedRoute from './components/ProtectedRoute'
import LoadingSpinner from './components/LoadingSpinner'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import Register from './pages/Register'

function App() {
  const { isAuthenticated, isLoading } = useAuth()
  
  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/posts" replace /> : <Login />
        } />
        <Route path="/register" element={
          isAuthenticated ? <Navigate to="/posts" replace /> : <Register />
        } />
        <Route path="/*" element={
          <ProtectedRoute>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/posts" element={<PostsDashboard />} />
              <Route path="/posts/:id" element={<PostDetail />} />
            </Routes>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
