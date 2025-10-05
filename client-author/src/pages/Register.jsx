import { useState } from 'react';
import { useRegister } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Register() {
    const registerMutation = useRegister();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
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
        
        registerMutation.mutate(formData, {
            onSuccess: () => {
                navigate('/login');
            },
            onError: (error) => {
                console.error('Registration failed:', error);
            }
        });
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen p-4'>
            <div className='w-full max-w-md bg-white border border-[var(--border-light)] px-5 py-8 sm:p-8 rounded-xl shadow-sm'>
                <div className='flex flex-col mb-6 items-center gap-4'>
                    <h2 className='text-3xl sm:text-4xl font-bold'>Create your account</h2>
                    <p className='text-[15px] text-[var(--subtle-light)] text-center'>Get started on your blogging journey today.</p>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className='block text-md font-medium text-slate-700 mb-1'>
                                Name
                                <input className='mt-1 p-3 w-full bg-slate-100 border-slate-300  rounded-lg focus:ring-blue-400 focus:border-blue-400 text-slate-900'
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label className='block text-md font-medium text-slate-700 mb-1 mt-4'>
                                Email
                                <input className='mt-1 p-3 w-full bg-slate-100 border-slate-300  rounded-lg focus:ring-blue-400 focus:border-blue-400 text-slate-900'
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
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
                            Register
                        </button>
                    </form>
                </div>
                <div className='text-center text-sm text-[var(--subtle-light)] mt-5'>
                    <p>Already have an account? <Link className='text-blue-500' to="/login">Log in here</Link>.</p>
                </div>
            </div>
        </div>
    );
}
export default Register;

