import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");
    const { user } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <div className="container-fluid">

                <Link className="navbar-brand" to="/products">Products</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-lg-0">
                        <li className="nav-item">

                            <Link className="nav-link" to="/cart">Cart</Link>
                        </li>


                    </ul>

                    <ul className="navbar-nav">
                        {isLoggedIn ? (
                            <>
                                {
                                    user?.is_admin == true && (
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/admin/add-product">Add Product</Link>
                                        </li>
                                    )
                                }

                                <li className="nav-item">

                                    <button style={{ verticalAlign: "-webkit-baseline-middle", color: "white" }} className="btn me-2 btn-sm btn-outline-success" >{user?.name}</button>
                                </li>
                                <li className="nav-item">

                                    <button style={{ verticalAlign: "-webkit-baseline-middle" }} className="btn btn-sm btn-outline-danger" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>

                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
        // <nav style={{ padding: '10px' }}>
        //     <Link to="/products">Products</Link> |{" "}
        //     <Link to="/cart">Cart</Link> |{" "}
        //     {isLoggedIn ? (
        //         <>
        //             <Link to="/admin/add-product">Add Product</Link> |{" "}
        //             <button onClick={handleLogout}>Logout</button>
        //         </>
        //     ) : (
        //         <>
        //             <Link to="/login">Login</Link> |{" "}
        //             <Link to="/register">Register</Link>
        //         </>
        //     )}
        // </nav>

    );
};

export default Header;
