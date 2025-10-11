import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import PostList from './pages/PostsList';
import PostInfo from './pages/PostInfo';
import LoadingSpinner from './components/LoadingSpinner';


function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
        <Route path="*" element={
          <ProtectedRoute>
            <NavBar />
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/posts/:id" element={<PostInfo />} />
            </Routes>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
