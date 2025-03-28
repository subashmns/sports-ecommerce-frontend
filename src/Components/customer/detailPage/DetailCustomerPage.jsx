import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../common/navBar";
import { Card, Container, Row, Col, Button, Form } from "react-bootstrap";
import { CartContext } from "../card/cartContext";
import "./DetailCustomerPage.css";

const DetailCustomerPage = () => {
  const [details, setDetails] = useState({});
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart, removeFromCart, isInCart } = useContext(CartContext);
  const { _id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://sports-ecommerce-backend-phi.vercel.app/products/${_id}`
        );
        setDetails(response.data);
        setMainImage(response.data.images[0]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product details", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [_id]);

  const handleImageClick = (image) => setMainImage(image);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleAddToCart = () => {
    if (quantity > details.stock) {
      alert("Cannot add more than available stock.");
      return;
    }
    addToCart(details, quantity);
    alert(`Added ${quantity} item(s) of ${details.name} to the cart.`);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(details._id);
    alert(`Removed ${details.name} from the cart.`);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to buy ${quantity} item(s) of ${details.name}.`);
    // Redirect to a checkout page or trigger buy logic here
  };

  return (
    <>
      <NavBar />
      <div className="detail-customer-page custom-background">
        <Container className="my-5">
          <Row className="product-card p-4 bg-white rounded custom-card-animation">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center custom-loading-animation">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                {/* Image Gallery Section */}
                <Col md={6} className="d-flex flex-column align-items-center">
                  <Card.Img
                    src={mainImage}
                    alt={details.name}
                    className="main-image custom-image-animation"
                  />
                  <div className="d-flex">
                    {details.images?.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="thumbnail custom-thumbnail-animation"
                        onClick={() => handleImageClick(image)}
                      />
                    ))}
                  </div>
                </Col>

                {/* Product Info Section */}
                <Col md={6}>
                  <h2 className="product-title mb-3 custom-title-animation">
                    {details.name}
                  </h2>
                  <h4 className="product-price mb-4 text-danger custom-price-animation">
                    Price: ${details.price}
                  </h4>
                  <p className="product-description mb-4 custom-description-animation">
                    {details.description}
                  </p>
                  <p>Stock: {details.stock}</p>
                  <p>Rating: {details.rating}</p>
                  <p>Category: {details.category}</p>

                  {/* Quantity Selector */}
                  <Form.Group controlId="quantity" className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <div className="quantity-group">
                      <Button
                        variant="outline-warning"
                        className="quantity-btn"
                        onClick={handleDecrement}
                        disabled={quantity <= 1}
                      >
                        -
                      </Button>
                      <span className="quantity-value">{quantity}</span>
                      <Button
                        variant="outline-warning"
                        className="quantity-btn"
                        onClick={handleIncrement}
                      >
                        +
                      </Button>
                    </div>
                  </Form.Group>

                  {/* Buttons */}
                  <div className="button-container d-flex justify-content-between">
                    <Button
                      className="btn-custom add-to-cart"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      className="btn-custom remove-from-cart"
                      onClick={handleRemoveFromCart}
                      disabled={!isInCart(details._id)}
                    >
                      Remove from Cart
                    </Button>
                    <Button
                      className="btn-custom buy-now"
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </Button>
                  </div>
                </Col>
              </>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default DetailCustomerPage;
