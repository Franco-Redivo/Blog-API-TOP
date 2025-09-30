import { useState } from 'react';
import { useRegister } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

function Register() {
    const registerMutation = useRegister();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
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
        registerMutation.mutate(formData),{
            onSuccess: () => {
                navigate('/login');
            },
            onError: (error) => {
                console.error('Registration failed:', error);
            }
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
            />
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
            <button type="submit">Register</button>
        </form>
    );
}
export default Register;
