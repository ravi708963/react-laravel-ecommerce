import React, { useContext, useEffect, useState } from 'react';
import axios from '../axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductList = () => {
    const navigate = useNavigate();
    const { token, user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState(null);


    const fetchProducts = async (pageNum = 1) => {
        const res = await axios.get(`/api/products?page=${pageNum}`);
        setProducts(res.data.data);
        setPage(res.data.current_page);
        setLastPage(res.data.last_page);
    };

    const addToCart = async (id) => {
        await axios.post('/api/cart', { product_id: id });
        toast.info("Added to cart");
    };
    const handleDelete = async (productId) => {
        if (!window.confirm("Delete this product?")) return;

        try {
            await axios.delete(`/api/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Product deleted");
            fetchProducts(page);
        } catch (err) {
            toast.error("Failed to delete product");
        }
    };
    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    return (
        <>
            <div className="container mt-2 px-4 py-2" style={{ maxWidth: "1000px", border: "2px solid cadetblue", borderRadius: "20px" }}>

                <div className="row my-3">
                    {products.map(p => (
                        <div key={p.id} className="col-md-4 my-2">
                            <div className="card ">
                                <img
                                    src={`/storage/${p.image}`}
                                    alt={p.name}
                                    className="card-img-top"
                                    style={{ height: '150px', objectFit: 'cover' }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p
                                        className="card-text mb-0"

                                    >

                                        {p.description.slice(0, 10)}...
                                        <button
                                            className="btn btn-link p-0 ms-1"
                                            style={{ fontSize: "0.9rem" }}
                                            onClick={() => setSelectedItem(p)}
                                        >
                                            See Details
                                        </button>
                                    </p>
                                    <p className="my-0">
                                        {p.sale_price ? (
                                            <>
                                                <s>${p.price}</s> <b className="">${p.sale_price}</b>
                                            </>
                                        ) : (
                                            <b>${p.price}</b>
                                        )}
                                    </p>
                                    {user?.is_admin == true ? (
                                        <div className="mt-2 space-x-2 d-flex justify-content-start" style={{ gap: "4%" }}>

                                            <button
                                                className="btn px-3 btn-sm btn-outline-success"
                                                onClick={() => navigate(`/admin/edit-product/${p.id}`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDelete(p.id)}
                                            >
                                                Delete
                                            </button>
                                            <button onClick={() => addToCart(p.id)} className="btn btn-sm btn-primary w-100">
                                                Add to Cart
                                            </button>
                                        </div>
                                    ) :
                                        (
                                            <button onClick={() => addToCart(p.id)} className="btn btn-sm btn-primary w-100">
                                                Add to Cart
                                            </button>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: "center" }}>
                    {page > 1 && <button className='btn btn-outline-success' onClick={() => setPage(page - 1)}> &#8606; Previous</button>}
                    {page < lastPage && <button className='btn btn-outline-success' onClick={() => setPage(page + 1)}>Next &#8608;</button>}
                </div>
            </div>

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
        </>
    );
};

export default ProductList;
