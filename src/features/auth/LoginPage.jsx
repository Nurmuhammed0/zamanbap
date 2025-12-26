import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useOrderStore } from '../../store/orderStore';

function LoginPage() {
    const [cafeName, setCafeName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // New state for password visibility
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const loginAdmin = useOrderStore((state) => state.loginAdmin);

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            if (userData.cafeName === cafeName && userData.password === password) {
                loginAdmin();
                navigate('/admin/dashboard');
            } else {
                setError('Кафенин аты же пароль туура эмес');
            }
        } else {
            // Redirect to registration if no user is found, as this is for the admin
            navigate('/register');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800">Админ-панелине кирүү</h1>
                {error && <p className="text-sm text-center text-red-500">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">Кафенин аты</label>
                        <input
                            type="text"
                            value={cafeName}
                            onChange={(e) => setCafeName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="relative"> {/* Added relative positioning for the button */}
                        <label className="block mb-2 text-sm font-medium text-gray-600">Пароль</label>
                        <input
                            type={showPassword ? 'text' : 'password'} // Dynamically set type
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" // Added pr-10 for button spacing
                        />
                        <button
                            type="button" // Important: set type to button to prevent form submission
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-sm leading-5"
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c0 1.524.386 3.007 1.114 4.357m14.07-5.132a11.968 11.968 0 0 1 3.98 5.132c-.728 1.35-1.94 2.537-3.328 3.465m-2.227-2.618C15.42 16.632 12.872 18 10 18c-2.872 0-5.42-1.368-7.149-3.565M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Кирүү
                        </button>
                    </div>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Админ-аккаунтуңуз жокпу?{' '}
                    <Link to="/register" className="font-medium text-blue-600 hover:underline">
                        Катталуу
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
