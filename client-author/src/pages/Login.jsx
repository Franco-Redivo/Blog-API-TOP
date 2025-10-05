import { useState } from 'react';
import { useLogin } from '../hooks/useUser';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const loginMutation = useLogin();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation.mutate(formData, {
            onSuccess: () => {
                navigate('/');
            },
            onError: (error) => {
                console.error('Login failed:', error);
            }
        });
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen p-4'>
            <div className='w-full max-w-md'>
                <div className='flex flex-col mb-6 items-center gap-4'>
                    <h2 className='text-4xl font-bold'>Bloggr</h2>
                    <p className='text-[var(--subtle-light)]'>Welcome back! Please login to your account.</p>
                </div>
                <div className='bg-white border border-[var(--border-light)] p-5 sm:p-8 rounded-xl shadow-sm'>
                    <form 
                        className=''
                        onSubmit={handleSubmit}>
                        <div>
                            <label className='block text-md font-medium text-slate-700 mb-1'>
                                Email
                                <input className='mt-1 p-3 w-full bg-slate-100 border-slate-300  rounded-lg focus:ring-blue-400 focus:border-blue-400 text-slate-900'
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="You@example.com"
                                    required
                                />
                            </label>
                        </div> 
                        <div>
                            <label className='block text-md font-medium text-slate-700 mb-1 mt-4'>
                                Password
                                <input className='mt-1 p-3 w-full bg-slate-100 border-slate-300  rounded-lg focus:ring-blue-400 focus:border-blue-400 text-slate-900'
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder='password'
                                    required
                                />
                            </label>
                        </div>   
                        <button
                         className=' mt-5 w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-light focus:ring-primary transition-all duration-200'   
                         type="submit">
                            Sign In
                        </button>
                    </form>
                </div>
                <div className='text-center text-sm text-[var(--subtle-light)] mt-4'>
                    <p>Don't have an account? <Link className='text-blue-500' to="/register">Register here</Link>.</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
