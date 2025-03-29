import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddProduct.css';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        category: '',
        quantity: '',
        description: '',
        images: []
    });
    const [imageURLs, setImageURLs] = useState(['']);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser._id) {
            setProduct((prevProduct) => ({ ...prevProduct, sellerId: storedUser._id }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Check if the value is a number and not negative
        if (name === 'price' || name === 'quantity') {
            if (value < 0) return; // Prevent negative values
        }

        setProduct({ ...product, [name]: value });
    };

    const handleImageURLChange = (index, e) => {
        const urls = [...imageURLs];
        urls[index] = e.target.value;
        setImageURLs(urls);
    };

    const addImageField = () => {
        setImageURLs([...imageURLs, '']);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!product.name || !product.price || !product.category || imageURLs.length === 0 || !product.quantity || !product.description) {
            setError('All fields are required!');
            return;
        }

        try {
            const formData = {
                ...product,
                images: imageURLs
            };

            await axios.post('https://sports-ecommerce-frontend-b6m8.vercel.app/seller/add', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setError(null);
            alert('Product added successfully!');
            setProduct({ name: '', price: '', category: '', quantity: 1, description: '', images: [] });
            setImageURLs(['']);
        } catch (error) {
            console.log("Error adding product:", error);
            setError('Server error! Please try again.');
        }
    };

    return (
        <div className="add-product">
            <h2>Add Product</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <input
                        type="text"
                        name="category"
                        className="form-control"
                        value={product.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Image URLs</label>
                    {imageURLs.map((url, index) => (
                        <div key={index} className="d-flex align-items-center mb-2">
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Enter image URL"
                                value={url}
                                onChange={(e) => handleImageURLChange(index, e)}
                                required
                            />
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary mt-2" onClick={addImageField}>
                        Add Another Image URL
                    </button>
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        className="form-control"
                        value={product.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
