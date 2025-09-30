import { useAuth } from './hooks/useAuth'


function NavBar () {
    const { user, logout } = useAuth()
  
    return (
        <nav>
        <div>
            <Link to="/">Dashboard</Link>
            <Link to="/create">Create Post</Link>
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