import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx'
import Error from '../pages/Error.jsx';
import {
    RouterProvider,
    createBrowserRouter
} from 'react-router-dom'
import Blog from '../pages/Blog.jsx';
import Faq from '../pages/Faq.jsx';
import BookDetails from '../components/BookDetails.jsx';
import App from '../App.jsx';
import MainLayout from './../Layout/MainLayout';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/products',
                element: <About />,
            },
            {
              path: '/*',
              element: <Error />,
          },
        ]
    }
]);

export default routes;