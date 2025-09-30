import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginUser, registerUser } from '../services/users'
import { useAuth } from './useAuth'

export const useLogin = () => {
    const queryClient = useQueryClient()
    const { login } = useAuth()
    
    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
    
            login(data)
            
            queryClient.setQueryData(['user'], data.user || data)
        },
        onError: (error) => {
            console.error('Login failed:', error)
        }
    })
}

export const useRegister = () => {
    const queryClient = useQueryClient()
    const { login } = useAuth()
    
    return useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            
            login(data)
            
            queryClient.setQueryData(['user'], data.user || data)
        },
        onError: (error) => {
            console.error('Registration failed:', error)
        }
    })
}
