// components/PrivateRoute.jsx

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children, adminOnly = false }) => {
    const { token, user } = useContext(AuthContext);

    if (!token) return <Navigate to="/login" />;

    if (adminOnly && user?.is_admin == false) return <Navigate to="/products" />;

    return children;
};

export default PrivateRoute;
