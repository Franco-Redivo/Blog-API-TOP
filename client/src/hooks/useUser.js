import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { loginUser, registerUser, getUserById } from '../services/users';
import { useAuth } from './useAuth';

export const useLogin = () => {
    const queryClient = useQueryClient();
    const { login } = useAuth();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            login(data);
            queryClient.setQueryData(['user'], data.user || data);
        },
        onError: (error) => {
            console.error('Login failed:', error);
        }
    });
}

export const useRegister = () => {

    return useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            //registration successful - user will need to log in
        },
        onError: (error) => {
            console.error('Registration failed:', error);
        }
    });
}

export const useUser = (userId) => {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUserById(userId),
        enabled: !!userId,
        staleTime: 10 * 60 * 1000, // 10 minutes
        cacheTime: 30 * 60 * 1000 // 30 minutes
    });
};