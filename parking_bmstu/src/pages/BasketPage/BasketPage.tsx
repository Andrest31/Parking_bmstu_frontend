// src/pages/CartPage/CartPage.tsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { removeFromCart, clearCart, updateQuantity } from '../../store/cartSlice';
import { Container, Row, Col, Button, Alert, Form } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './BasketPage.css';

const BasketPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [clientName, setClientName] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [subscriptionExpiry, setSubscriptionExpiry] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Здесь можно добавить проверку на валидность введенных данных
    if (!clientName || !licensePlate || !subscriptionExpiry) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    // Обработаем данные клиента (например, отправим на сервер или сохраним в состоянии)
    console.log("Информация клиента:", { clientName, licensePlate, subscriptionExpiry });

    // Очистим поля после отправки формы
    setClientName('');
    setLicensePlate('');
    setSubscriptionExpiry('');
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
          Очистить абонемента
        </Button>

        {/* Форма для ввода информации о клиенте */}
        <h3 className="mt-5">Информация о клиенте</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="clientName">
            <Form.Label>Имя клиента</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите имя клиента"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="licensePlate">
            <Form.Label>Гос. номер</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите гос. номер"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="subscriptionExpiry">
            <Form.Label>Срок действия абонемента</Form.Label>
            <Form.Control
              type="date"
              value={subscriptionExpiry}
              onChange={(e) => setSubscriptionExpiry(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" className="mt-3" variant="primary">
            Подтвердить
          </Button>
        </Form>
      </main>
      <Footer />
    </Container>
  );
};

export default BasketPage;
