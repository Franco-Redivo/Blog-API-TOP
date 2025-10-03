import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'


function NavBar () {
    const { user, logout } = useAuth()
    console.log(user)
    return (
        <nav className="flex justify-between items-center p-4 w-full bg-white text-black shadow-md h-16">
        <div>
            <h1 className="text-1xl md:text-2xl font-bold">Bloggr</h1>
        </div>    
        <div className='space-x-4'>
            <Link className='hover:text-blue-500' to="/">Home</Link>
            <Link className='hover:text-blue-500' to="/posts">Dashboard</Link>
        </div>
        <div className='flex items-center space-x-2 md:space-x-4'>
            <button 
            onClick={logout}
            className=" text-red-500 py-1 rounded-md"
            >
            Logout
            </button>
            <span className='hidden md:inline-flex'>{user.name}</span>
        </div>
        </nav>
    )
}

export default NavBar