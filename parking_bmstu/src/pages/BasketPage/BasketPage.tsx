import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { removeFromCart, clearCart, updateQuantity } from '../../store/cartSlice';
import { Container, Row, Col, Button, Alert, Form } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import axios from 'axios'; // Импортируем axios для выполнения запросов
import './BasketPage.css';

const BasketPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [clientName, setClientName] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [subscriptionExpiry, setSubscriptionExpiry] = useState('');

  // Здесь предполагаем, что `id` абонемента передается из корзины, например, это может быть ID товара.
  const passId = 123; // Этот ID должен быть получен динамически (например, через URL или как-то еще)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Проверяем, заполнены ли все поля формы
    if (!clientName || !licensePlate || !subscriptionExpiry) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    // Формируем объект заказа
    const order = {
      clientName,
      licensePlate,
      subscriptionExpiry,
      cartItems,
    };

    try {
      // Отправляем запрос на создание заказа
      const response = await axios.put(
        `http://127.0.0.1:8000/passes/${passId}/form/`, // Используем passId в URL
        order, // Отправляем данные в теле запроса
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        alert('Заказ успешно создан!');
        // Очистить корзину после успешного оформления заказа
        dispatch(clearCart());
      } else {
        alert('Ошибка при создании заказа.');
      }
    } catch (error) {
      alert('Произошла ошибка при отправке заказа.');
      console.error(error);
    }

    // Очистка данных клиента после отправки заказа
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
