import { useAuth } from '../hooks/useAuth'
import { useUser } from '../hooks/useUser';

function NavBar () {
    const { user, logout } = useAuth()
    const { data: userData, isLoading, error } = useUser(user?.id);

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
            {isLoading ? (
                <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : error ? (
                <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center">
                    <span className="text-white text-xs">?</span>
                </div>
            ) : userData?.avatar ? (
                <img 
                    className='h-8 w-8 rounded-full object-cover' 
                    src={userData.avatar} 
                    alt={userData.name || 'User avatar'} 
                />
            ) : (
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                        {userData?.name?.charAt(0)?.toUpperCase() || user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                </div>
            )}
        </div>
        </nav>
    )
}

export default NavBar