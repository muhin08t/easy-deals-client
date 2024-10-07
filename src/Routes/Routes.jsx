import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx'
import Error from '../pages/Error.jsx';
import {
    RouterProvider,
    createBrowserRouter
} from 'react-router-dom'

import MainLayout from './../Layout/MainLayout';
import LoginLayout from '../Layout/LoginLayout.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import Register from './../pages/Register';
import Products from '../pages/Products.jsx';

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
                element: <Products />,
            },
            {
                path: "/register",
                element: <Register />,
              },
            {
              path: '/*',
              element: <Error />,
          },
        ]
    } ,
    {
        path: "/login",
        element: <LoginLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },

        ],
      },
]);

export default routes;