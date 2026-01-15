import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo'; // Import the Logo component

function Header({ onScroll }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const navLinks = [
        { name: 'Мүмкүнчүлүктөр', id: 'features' },
        { name: 'Видео', id: 'video' },
        { name: 'Галерея', id: 'gallery' },
        { name: 'Колдонуу', id: 'how-to-use' },
    ];

    const handleLinkClick = (id) => {
        onScroll(id);
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Logo className="w-12 h-12 text-cafe-accent" />
                    <h1 className="text-2xl font-bold text-white ml-3">Заманбап</h1>
                </div>
                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <button key={link.id} onClick={() => handleLinkClick(link.id)} className="text-gray-300 hover:text-cafe-accent font-semibold transition-colors duration-200">
                            {link.name}
                        </button>
                    ))}
                    <Link to="/register" className="px-6 py-2 bg-cafe-accent text-gray-900 font-bold rounded-lg hover:bg-cafe-primary hover:text-white transition-all duration-200 shadow-md">
                        Катталуу
                    </Link>
                </nav>
                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-gray-800 shadow-xl">
                    <nav className="flex flex-col p-4 space-y-4">
                        {navLinks.map((link) => (
                            <button key={link.id} onClick={() => handleLinkClick(link.id)} className="text-gray-300 hover:text-cafe-accent font-semibold text-left">
                                {link.name}
                            </button>
                        ))}
                        <Link to="/register" className="w-full text-center px-6 py-2 bg-cafe-accent text-gray-900 font-bold rounded-lg hover:bg-cafe-primary hover:text-white transition-all duration-200 shadow-md">
                            Катталуу
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Header;
