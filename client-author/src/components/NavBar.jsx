import { useAuth } from '../hooks/useAuth'

function NavBar () {
    const { user, logout } = useAuth()
    return (
        <nav className="flex justify-between items-center p-4 w-full bg-white text-black shadow-md h-16">
        <div>
            <h1 className="text-1xl md:text-2xl font-bold">Bloggr</h1>
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