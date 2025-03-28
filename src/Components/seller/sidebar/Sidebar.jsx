// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Seller Dashboard</h2>
            <ul>
                <li><Link to="/seller/dashboard">Dashboard</Link></li>
                <li><Link to="/seller/products">My Products</Link></li>
                <li><Link to="/seller/add-product">Add Product</Link></li>
                <li><Link to="/seller/orders">Orders</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
