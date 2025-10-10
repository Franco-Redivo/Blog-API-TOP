import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext.jsx'
import App from './App.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      refetchOnWindowFocus: false,
      retry: 1
    },
    mutations: {
      retry: 1
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </AuthProvider>
)
 