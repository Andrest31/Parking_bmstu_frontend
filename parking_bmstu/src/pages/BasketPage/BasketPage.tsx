// src/pages/CartPage/CartPage.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { removeFromCart, clearCart, updateQuantity } from '../../store/cartSlice';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './BasketPage.css';

const BasketPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  return (
    <Container fluid>
      <Header />
      <main className="main text-center">
        <h2 className="mb-4">Корзина</h2>
        {cartItems.length === 0 ? (
          <Alert variant="info">Корзина пуста</Alert>
        ) : (
          <Row>
            {cartItems.map((item) => (
              <Col key={item.id} xs={12} md={4} className="mb-4">
                <div className="cart-item">
                  <img src={item.imageCard} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <div className="quantity-controls">
                        <h5>{item.name}</h5>
                      <Button
                        variant="secondary"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <h4>{item.quantity}</h4>
                      <Button
                        variant="secondary"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                    <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>
                      Удалить
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
        <Button variant="danger" onClick={handleClearCart} className="mt-4">
          Очистить корзину
        </Button>
      </main>
      <Footer />
    </Container>
  );
};

export default BasketPage;
