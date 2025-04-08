import React from "react";
import ReactDOM from "react-dom/client";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Login from "./component/Login";
import ProductList from "./component/ProductList";
import Cart from "./component/Cart";
import Header from "./component/Header";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./component/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./component/Register";
import ProductForm from "./component/ProductForm";

const App = () => {
    const isLoggedIn = !!localStorage.getItem("token");

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to="/products" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<ProductList />} />
                <Route
                    path="/cart"
                    element={
                        <PrivateRoute>
                            <Cart />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/add-product"
                    element={
                        <PrivateRoute adminOnly={true}>
                            <ProductForm />
                        </PrivateRoute>
                    }
                />
                <Route path="/admin/edit-product/:id" element={<ProductForm />} />
            </Routes>
            <ToastContainer />
        </Router>
    );
};

ReactDOM.createRoot(document.getElementById("app")).render(
    <AuthProvider>
        <App />
    </AuthProvider>
);
