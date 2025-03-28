import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer', // Ensure this matches backend expectations
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'role') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.toLowerCase(), // Ensure lowercase role
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      console.log("Payload being sent:", payload);

      const response = await axios.post('https://sports-ecommerce-backend-phi.vercel.app/users/signup', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Registration success
      setSuccessMessage("Registration successful!");
      setErrorMessage('');

      // Store the token in localStorage (assuming the backend sends a token)
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        console.log('Token stored in localStorage');
      }

      // Clear form data after successful registration
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'customer',
      });

    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
