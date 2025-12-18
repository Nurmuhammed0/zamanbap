import React from 'react';
import { useLocation } from 'react-router-dom';
import MenuPage from '../features/menu/MenuPage';
import LandingPage from './LandingPage';

function Root() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const tableId = searchParams.get('table');

    if (tableId) {
        return <MenuPage />;
    }

    return <LandingPage />;
}

export default Root;
