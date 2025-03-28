import React from 'react';
import { Carousel } from 'react-bootstrap';
import banner from './banner.png';
import './banner.css';  // Make sure you create this file for CSS

const BannerCarousel = () => {
  return (
    <div className="container my-5">
      <Carousel fade interval={3000} controls indicators>
        {/* First Banner */}
        <Carousel.Item className="carousel-item-animation">
          <img
            className="d-block w-100 image-animation"
            src={banner}
            alt="First Banner"
            style={{ height: '500px', objectFit: 'cover' }}
          />
          <Carousel.Caption className="caption-animation">
            <h5>Latest Sports Gear</h5>
            <p>Shop the latest sports items at unbeatable prices!</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Second Banner */}
        <Carousel.Item className="carousel-item-animation">
          <img
            className="d-block w-100 image-animation"
            src="https://plus.unsplash.com/premium_photo-1682435566673-cedb75cd7459?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Second Banner"
            style={{ height: '500px', objectFit: 'cover' }}
          />
          <Carousel.Caption className="caption-animation">
            <h5>Exclusive Sports Deals</h5>
            <p>Exclusive deals just for you. Don't miss out on these limited-time offers!</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Third Banner */}
        <Carousel.Item className="carousel-item-animation">
          <img
            className="d-block w-100 image-animation"
            src="https://plus.unsplash.com/premium_photo-1679690884144-1f43b8f3bf41?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Third Banner"
            style={{ height: '500px', objectFit: 'cover' }}
          />
          <Carousel.Caption className="caption-animation">
            <h5>Seasonal Sports Collection</h5>
            <p>Get ready for the next season with our collection of sports goods and gear.</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Fourth Banner */}
        <Carousel.Item className="carousel-item-animation">
          <img
            className="d-block w-100 image-animation"
            src="https://images.unsplash.com/photo-1627627256672-027a4613d028?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGJhc2tldGJhbGx8ZW58MHx8MHx8fDA%3D"
            alt="Fourth Banner"
            style={{ height: '500px', objectFit: 'cover' }}
          />
          <Carousel.Caption className="caption-animation">
            <h5>Free Shipping Offer</h5>
            <p>Shop now and enjoy free shipping on all orders! No minimum required.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
