import React, { useContext } from 'react';
import { CartContext } from '../card/cartContext';
import { Button, Card, Row, Col, Badge } from 'react-bootstrap';
import 'animate.css';  // Import animate.css
import './ViewCart.css';  // Custom CSS for animation and styles

const CartPage = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity, count, search } = useContext(CartContext);

  

  const filtering = cartItems.filter((product) => {
    const matchesSearch =
      search.toLowerCase() === ""
        ? product
        : product.name.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  // Calculate the total amount
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container py-5 cart-container">
      <h2 className="text-center mb-4 animate__animated animate__fadeInDown">Your Cart</h2>
      <Row>
        {cartItems.length === 0 ? (
          <div className="col-12 text-center">
            <h4>Your cart is empty!</h4>
          </div>
        ) : (
          filtering.map((item) => (
            <Col md={6} lg={4} key={item._id} className="mb-4">
              <Card className="cart-item-card landscape-card animate__animated animate__fadeInUp">
                <Row noGutters>
                  <Col xs={4}>
                    <Card.Img
                      src={item.images}
                      alt={item.name}
                      className="cart-item-image landscape-image"
                    />
                  </Col>
                  <Col xs={8}>
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>
                        Price: <strong>${item.price}</strong>
                      </Card.Text>
                      <div className="d-flex justify-content-between align-items-center quantity-container">
                        <div className="quantity-buttons">
                          <Button
                            variant="outline-warning"
                            className="animate__animated animate__bounceIn"
                            onClick={() => updateCartItemQuantity(item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <span className="quantity-value mx-3">{item.quantity}</span>
                          <Button
                            variant="outline-warning"
                            className="animate__animated animate__bounceIn"
                            onClick={() => updateCartItemQuantity(item._id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          variant="danger"
                          onClick={() => removeFromCart(item._id)}
                          className="remove-btn animate__animated animate__pulse"
                        >
                          Remove
                        </Button>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))
        )}
      </Row>
      <div className="cart-footer mt-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center animate__animated animate__fadeInUp">
          <h4 className="total-items">
            Total Items: <Badge bg="primary">{count}</Badge>
          </h4>
          <h4 className="total-amount">
            Total Amount: <strong>${totalAmount.toFixed(2)}</strong>
          </h4>
          <Button variant="success" size="lg" className="px-4 py-2 checkout-btn animate__animated animate__pulse">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
