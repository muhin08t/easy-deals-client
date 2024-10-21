import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from '../pages/Home.jsx';
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
import ProtectedRoute from './ProtectedRoute';
import ProductDetails from './../pages/ProductDetails';
import Profile from './../pages/dashboardPages/Profile';
import AllUsers from './../pages/dashboardPages/AllUsers';
import Messages from './../pages/dashboardPages/Messages';
import MessageDetails from './../pages/dashboardPages/MessageDetails';
import CreateMessage from '../pages/dashboardPages/CreateMessage.jsx';
import DashboardLayout from './../Layout/DashboardLayout';

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
                element:
                (
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                ) ,
            },
            {
              path: '/products/:id',
              element:
              (
                <ProtectedRoute>
                  <ProductDetails />
                </ProtectedRoute>
              ) ,
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
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <Profile />,
          },
          {
            path: "allUsers",
            element: <AllUsers />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "messages",
            element: <Messages />,
          },
          {
            path: "messages/:id",
            element: <MessageDetails />,
          },
          {
            path: "createMessage",
            element: <CreateMessage />,
          },
        ],
      },
]);

export default routes;