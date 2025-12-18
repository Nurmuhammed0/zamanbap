import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useOrderStore } from '../../store/orderStore';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const loginAdmin = useOrderStore((state) => state.loginAdmin);

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            if (userData.email === email && userData.password === password) {
                loginAdmin();
                navigate('/admin/dashboard');
            } else {
                setError('Электрондук почта же пароль туура эмес');
            }
        } else {
            // Redirect to registration if no user is found, as this is for the admin
            navigate('/register');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800">Админ-панелине кирүү</h1>
                {error && <p className="text-sm text-center text-red-500">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">Электрондук почта</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">Пароль</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
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
