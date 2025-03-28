import React, { useState, useEffect } from 'react';
import Button from '@mui/joy/Button';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import { Card } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import './CardStyles.css';

export default function ProductCard({ img, images = [], name, category, price, quantity, id }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cycle through images every 5 seconds
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [images]);

  const displayImage = images.length > 0 ? images[currentImageIndex] : img;

  // Truncate name if it's too long
  const truncatedName = name.length > 20 ? `${name.slice(0, 20)}...` : name;

  return (
    <Card
      className="card-container"
      hoverable
      style={{ height: 'auto' }}
      cover={
        <div className="card-image-wrapper">
          <img
            alt="product"
            src={displayImage}
            className="card-image"
          />
        </div>
      }
    >
      <CardContent className="card-content">
        <h3 className="card-title">{truncatedName}</h3>
        <p className="card-category">Category: {category}</p>
        <p className="card-quantity">Quantity: {quantity}</p>
        <p className="card-price">Price: {price} USD</p>
      </CardContent>

      <CardOverflow className="card-buttons">
        <RouterLink to={`/product/${id}`}>
          <Button className="add-to-cart-button" variant="solid">
            Add to Cart
          </Button>
        </RouterLink>
        <RouterLink to={`/purchase/${id}`}>
          <Button className="buy-now-button" variant="solid">
            Buy Now
          </Button>
        </RouterLink>
      </CardOverflow>
    </Card>
  );
}
