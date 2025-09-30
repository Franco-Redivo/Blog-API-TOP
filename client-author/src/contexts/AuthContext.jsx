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
    const { token: authToken, user: userData } = authData
    
    if (authToken) {
      localStorage.setItem('authToken', authToken)
      setToken(authToken)
      
      if (userData) {
        setUser(userData)
      } else {
        const decodedToken = decodeToken(authToken)
        if (decodedToken) {
          setUser({
            id: decodedToken.id || decodedToken.userId || decodedToken.sub,
            email: decodedToken.email,
            name: decodedToken.name,
          })
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