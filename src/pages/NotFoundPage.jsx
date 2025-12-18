import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-cafe-background text-center">
            <h1 className="text-6xl font-bold text-cafe-primary mb-4">404</h1>
            <p className="text-2xl text-gray-700 mb-6">Бул баракча табылган жок.</p>
            <Link to="/" className="px-6 py-3 bg-cafe-primary text-white font-bold rounded-lg hover:bg-gray-800 transition-colors">
                Башкы бетке кайтуу
            </Link>
        </div>
    );
}

export default NotFoundPage;
