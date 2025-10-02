import { createContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const decodeToken = (token) => {
  try {
    const payload = token.split('.')[1]
    const decoded = JSON.parse(atob(payload))
    return decoded
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

const isTokenExpired = (decodedToken) => {
  if (!decodedToken || !decodedToken.exp) return true
  const currentTime = Date.now() / 1000
  return decodedToken.exp < currentTime
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')
    
    if (storedToken) {
      const decodedToken = decodeToken(storedToken)
      
      if (decodedToken && !isTokenExpired(decodedToken)) {
        setToken(storedToken)
        setUser({
          id: decodedToken.id || decodedToken.userId || decodedToken.sub,
          email: decodedToken.email,
          name: decodedToken.name,
        })
      } else {
        localStorage.removeItem('authToken')
      }
    }
    
    setIsLoading(false)
  }, [])

  const login = (authData) => {
    // Handle both 'token' and 'accessToken' fields
    const { token: authToken, accessToken, user: userData } = authData
    const finalToken = authToken || accessToken
    
    if (finalToken) {
      localStorage.setItem('authToken', finalToken)
      setToken(finalToken)
      
      if (userData) {
        setUser(userData)
      } else {
        const decodedToken = decodeToken(finalToken)
        if (decodedToken) {
          const user = {
            id: decodedToken.id || decodedToken.userId || decodedToken.sub,
            email: decodedToken.email,
            name: decodedToken.name,
          }
          setUser(user)
        }
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setToken(null)
    setUser(null)
  }

  const value = {
    token,
    user,
    userId: user?.id,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }

export default AuthContext