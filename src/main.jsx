// index.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
    RouterProvider,
    createBrowserRouter
} from 'react-router-dom'
import routes from './Routes/Routes.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
    <RouterProvider router={routes}> </RouterProvider>
    </AuthProvider>
)
