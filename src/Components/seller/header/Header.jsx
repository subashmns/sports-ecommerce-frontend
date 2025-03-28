import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.css'; // CSS file for styles

const HandleClick = () =>{
    localStorage.removeItem('authToken')
    localStorage.removeItem('google_email')
    localStorage.removeItem('user')
}


const Header = () =>{ 
    const Username = JSON.parse(localStorage.getItem('user'))
    
    return(
    <header className="header">
        <div className="header-left">
            <h1 className="logo">Seller Dashboard </h1>
            <nav className="nav-links">
                <Link to="seller/dashboard" className="nav-link">Home</Link>
                <Link to="seller/products" className="nav-link">Products</Link>
                <Link to="seller/add-product" className="nav-link">Add Products</Link>
                <Link to="seller/orders" className="nav-link">Orders</Link>
            </nav>
        </div>
        <div className="header-right">
            <span className="user-info">Hello, {Username.name}</span>
            <button className="logout-btn" onClick={HandleClick}>Logout</button>
        </div>
    </header>
);
}
export default Header;
