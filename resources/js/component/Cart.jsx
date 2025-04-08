// resources/js/components/Cart.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [total, setTotal] = useState(0);

    const token = localStorage.getItem("token");
    const fetchCart = async () => {
        try {
            const res = await axios.get("/api/cart", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCartItems(res.data);
        } catch (err) {
            console.error("Error fetching cart:", err);
        }
    };

    const updateQuantity = async (id, quantity) => {
        try {
            await axios.put(
                `/api/cart/${id}`,
                { quantity },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            fetchCart();
        } catch (err) {
            console.error("Error updating quantity:", err);
        }
    };

    const removeItem = async (id) => {
        try {
            await axios.delete(`/api/cart/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchCart();
        } catch (err) {
            console.error("Error removing item:", err);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);
    useEffect(() => {
        if (!cartItems.length) return;

        const newTotal = cartItems.reduce((sum, item) => {
            const price = item.product.sale_price || item.product.price;
            return sum + item.quantity * price;
        }, 0);

        setTotal(newTotal);
    }, [cartItems]);
    return (
        <div className="container mt-3 px-4 py-2" style={{ maxWidth: "990px", border: "2px solid cadetblue", borderRadius: "20px" }}>

            {cartItems.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <>
                    <style>{`
                        .thin-scroll {
                        padding-right:4%;
                        max-height: 82vh;
                        overflow-y: auto;
                        scrollbar-width: thin;
                        scrollbar-color: rgba(0,0,0,0.2) transparent;
                        }

                        .thin-scroll::-webkit-scrollbar {
                        width: 2px;
                        }

                        .thin-scroll::-webkit-scrollbar-thumb {
                        background-color: rgba(0, 0, 0, 0.2);
                        border-radius: 2px;
                        }

                        .thin-scroll::-webkit-scrollbar-track {
                        background: transparent;
                        }
                    `}</style>

                    <div className="d-flex" style={{ gap: "4%" }}>

                        <ul style={{ maxHeight: "82vh", overflow: "auto" }} className="thin-scroll col-md-6">
                            {cartItems.map((item) => (
                                <li style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "20px" }} className="p-4 my-3" key={item.id}>
                                    <div className="d-flex justify-content-evenly">
                                        <h4 className="col-md-8 mb-0">{item.product.name}</h4>
                                        <div className="mb-3 col-md-4 d-flex align-items-center">
                                            <label className="form-label">Qty: </label>
                                            <input
                                                type="number"
                                                min="1"
                                                className="form-control"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    updateQuantity(item.id, parseInt(e.target.value))
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p>Price: ₹{item.product.sale_price || item.product.price}</p>
                                        <p>Total: ₹{item.quantity * (item.product.sale_price || item.product.price)}</p>

                                    </div>

                                    <button className="btn btn-sm btn-outline-success" onClick={() => setSelectedItem(item.product)}>
                                        See Details</button>
                                    <button className="btn mx-3 btn-sm btn-outline-danger" onClick={() => removeItem(item.id)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                        <div className="col-md-5 my-3 p-4" style={{ minHeight: "80vh", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "20px" }}>
                            <table className="w-100">
                                <tr className="py-4">
                                    <td>
                                        Total Items
                                    </td>
                                    <td style={{ textAlign: "end" }}>
                                        {cartItems.length}
                                    </td>
                                </tr>
                                <tr className="py-4">
                                    <td>
                                        Disscount
                                    </td>
                                    <td style={{ textAlign: "end" }}>
                                        0
                                    </td>
                                </tr>
                                <tr className="py-4">
                                    <td>
                                        Coupons For You
                                    </td>
                                    <td style={{ textAlign: "end" }}>
                                        0
                                    </td>
                                </tr>
                                <tr className="py-4">
                                    <td>
                                        Delivery Charges
                                    </td>
                                    <td style={{ textAlign: "end" }}>
                                        Free
                                    </td>
                                </tr>
                                <tr className="py-4">
                                    <td>
                                        Product Promise Fee
                                    </td>
                                    <td style={{ textAlign: "end" }}>
                                        0
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Total Amount
                                    </td>
                                    <td style={{ textAlign: "end" }}>
                                        ₹{total}
                                    </td>
                                </tr>
                            </table>
                            <button onClick={() => toast.info("Under Developement !!")} className="btn btn-primary w-100 mt-5">
                                Place Order
                            </button>
                        </div>
                    </div>
                </>
            )}

            {selectedItem && (
                <div
                    className="modal show fade"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                    tabIndex="-1"
                    role="dialog"
                    onClick={() => setSelectedItem(null)}
                >
                    <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedItem.name}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setSelectedItem(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <img
                                    src={`/storage/${selectedItem.image}`}
                                    alt={selectedItem.name}
                                    className="card-img-top"
                                    style={{ height: '150px', objectFit: 'cover' }}
                                />
                                <p>{selectedItem.description}</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setSelectedItem(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
