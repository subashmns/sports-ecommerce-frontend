// SellerDashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import icons
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [stats, setStats] = useState({ totalProducts: 0, totalQuantity: 0 });
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const sellerId = storedUser._id;

    useEffect(() => {
        const fetchSellerData = async () => {
            try {
                const productRes = await axios.get(`https://sports-ecommerce-backend-phi.vercel.app/seller/products/${sellerId}`);
                setProducts(productRes.data.products);

                const totalQuantity = productRes.data.products.reduce((sum, product) => sum + product.quantity, 0);
                setStats({ totalProducts: productRes.data.products.length, totalQuantity });
            } catch (error) {
                console.error("Error fetching seller data:", error);
            }
        };

        fetchSellerData();
    }, [sellerId]);

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`https://sports-ecommerce-backend-phi.vercel.app/seller/products/${sellerId}/${productId}`);
            const updatedProducts = products.filter((product) => product._id !== productId);
            setProducts(updatedProducts);

            const totalQuantity = updatedProducts.reduce((sum, product) => sum + product.quantity, 0);
            setStats({ totalProducts: updatedProducts.length, totalQuantity });
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="seller-dashboard">
            <h1>Seller</h1>

            <div className="stats">
                <h3>Inventory Stats</h3>
                <p>Total Products: {stats.totalProducts}</p>
                <p>Total Quantity: {stats.totalQuantity}</p>
            </div>

            <div className="actions">
                <Link to="/seller/seller/add-product" className="btn">Add New Product</Link>
            </div>

            <div className="product-list">
                <h3>Your Products</h3>
                {products.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='text-start'>Name</th>
                                <th className='text-start'>Price</th>
                                <th className='text-start'>Category</th>
                                <th className='text-start'>Quantity</th>
                                <th className='text-start'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <Link to={`/seller/edit-product/${product._id}`} className="btn btn-secondary">
                                            <FaEdit /> Edit
                                        </Link>
                                        <button onClick={() => handleDelete(product._id)} className="btn btn-danger">
                                            <FaTrashAlt /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
