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
import CategoryBasedProducts from '../pages/CategoryBasedProducts.jsx';
import AllCategories from './../pages/dashboardPages/AllCategories';
import AllProducts from './../pages/dashboardPages/AllProducts';
import UserProducts from './../pages/dashboardPages/UserProducts';
import AddProductUsingReactHookForm from './../pages/AddProductUsingReactHookForm';
import AddCategory from './../pages/dashboardPages/AddCategory';
import ThemeSwitcher from './../pages/dashboardPages/ThemeSwitcher';

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
            path: '/category/products/:cat_id',
            element:
            (
              <ProtectedRoute>
                <CategoryBasedProducts />
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
            path: "allCategories",
            element: <AllCategories />,
          },
          {
            path: "allProducts",
            element: <AllProducts />,
          },
          {
            path: "userProducts",
            element: <UserProducts />,
          },
          {
            path: "addProducts",
            element: <AddProductUsingReactHookForm />,
          },
          {
            path: "addCategory",
            element: <AddCategory />,
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
          {
            path: "themeSwithcher",
            element: <ThemeSwitcher />,
          },
        ],
      },
]);

export default routes;