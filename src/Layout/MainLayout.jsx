import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <div>
            <Outlet />
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;