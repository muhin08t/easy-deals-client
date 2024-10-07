import React from "react";
import { createContext, useState } from "react";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  const { user } = useContext(AuthContext);
  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default ProtectedRoute;