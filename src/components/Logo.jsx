import React from 'react';
import newLogo from '../assets/new_logo.png'; // Логотипти импорттоо

const Logo = ({ className }) => (
  <img src={newLogo} alt="Cafe Logo" className={`${className} bg-white p-0.5 rounded-lg`} />
);

export default Logo;

