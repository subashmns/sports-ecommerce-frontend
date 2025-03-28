import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/customerPage/HomePage';
import DetailCustomerPage from './Components/customer/detailPage/DetailCustomerPage';
import ProductPage from './Pages/customerPage/ProductPage';
import { CartProvider } from './Components/customer/card/cartContext';
import Cart from './Pages/customerPage/Cart';
import Registration from './Components/registration/Registration';
import LoginPage from './Components/login/LoginPage';
import SellerDashboardLayout from './Components/seller/route/SellerDashboardLayout';
// import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <CartProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Registration />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/viewcart" element={<Cart />} />
        <Route path="/product/:_id" element={<DetailCustomerPage />} />

        {/* Protected Routes */}
        <Route
          path="/seller/*"
          element={<SellerDashboardLayout /> }
        />
        {/* Add more protected routes if needed */}
      </Routes>
    </CartProvider>
  );
}

export default App;
