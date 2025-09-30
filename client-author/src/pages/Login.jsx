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
        <div>
            <div>
                <h2>Bloggr</h2>
                <p>Welcome back! Please login to your account.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            <div>
                <p>Don't have an account? <Link to="/register">Register here</Link>.</p>
            </div>
        </div>
    );
}

export default Login;
