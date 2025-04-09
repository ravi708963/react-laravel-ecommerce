import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from '../axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const ProductForm = ({ refresh }) => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [errors, setErrors] = useState({});


    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState({ name: '', description: '', price: '', sale_price: '' });
    const [image, setImage] = useState(null);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: null }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(form).forEach((key) => {
            if (form[key] !== null) formData.append(key, form[key]);
        });
        if (image) {
            formData.append("image", image);
        }
        try {
            if (isEdit) {
                await axios.post(`/api/products/${id}?_method=PUT`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success("Product updated");
            } else {
                console.log(formData);

                await axios.post("/api/products", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                toast.success("Product created");
            }
            navigate("/");
        } catch (err) {
            if (err.response && err.response.status === 422) {
                const responseErrors = err.response.data.errors;
                setErrors(responseErrors);
            } else if (err.response && err.response.status === 403) {
                toast.error("You are not authorized to perform this action.");
            } else {
                toast.error("Something went wrong.");
            }
        }
    };

    useEffect(() => {
        if (id) {
            setIsEdit(true);
            axios
                .get(`/api/products/${id}`)
                .then((res) => {
                    const p = res.data;
                    console.log(p);

                    setForm({
                        name: p.name,
                        description: p.description,
                        price: p.price,
                        sale_price: p.sale_price,
                        image: null,
                    });
                })
                .catch((err) => toast.error("Failed to load product"));
        }
    }, [id]);

    return (

        <form onSubmit={handleSubmit} className="container mt-3 p-4" style={{ maxWidth: "500px", border: "2px solid cadetblue", borderRadius: "20px" }}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Product Name</label>
                <input
                    name="name"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"

                />
                {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    name="description"
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description"

                />
                {errors.description && <div className="invalid-feedback">{errors.description[0]}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input
                    name="price"
                    type="number"
                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Price"

                />
                {errors.price && <div className="invalid-feedback">{errors.price[0]}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="sale_price" className="form-label">Sale Price</label>
                <input
                    className='form-control'
                    name="sale_price"
                    type="number"
                    value={form.sale_price}
                    onChange={handleChange}
                    placeholder="Sale Price"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="image" className="form-label">Product Image</label>
                <input className='form-control' type="file" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <button className="btn btn-primary w-100" type="submit">{isEdit ? "Update Product" : "Add Product"}</button>
        </form>

    );
};

export default ProductForm;
