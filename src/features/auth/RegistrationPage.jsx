import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegistrationPage() {
    const [fullName, setFullName] = useState('');
    const [cafeName, setCafeName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // For now, we'll store registration data in localStorage.
        const userData = { fullName, cafeName, email, password };
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('cafeName', cafeName); // Also save cafeName separately for easy access
        alert('Каттоо ийгиликтүү аяктады!');
        navigate('/login'); // Redirect to login page after registration
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800">Каттоо</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">Аты-жөнү</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
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
                        <label className="block mb-2 text-sm font-medium text-gray-600">Жеке пароль</label>
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
                            Катталуу
                        </button>
                    </div>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Аккаунтуңуз барбы?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:underline">
                        Кирүү
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegistrationPage;
