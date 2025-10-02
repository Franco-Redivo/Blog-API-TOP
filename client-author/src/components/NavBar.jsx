import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'


function NavBar () {
    const { user, logout } = useAuth()
  
    return (
        <nav>
        <div>
            <Link to="/">Home</Link>
            <Link to="/posts">Dashboard</Link>
        </div>
        <div>
            <span>Welcome, {user?.name || user?.email}!</span>
            <button 
            onClick={logout}
            >
            Logout
            </button>
        </div>
        </nav>
    )
}

export default NavBar