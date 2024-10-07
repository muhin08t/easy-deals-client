import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const LoginLayout = () => {
    return (
        <div>
            <Navbar />
            <div className='min-h-screen'>
            <Outlet />
            </div>
            <Footer></Footer>
        </div>
    );
};

export default LoginLayout;