import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { removeFromCart, clearCart, updateQuantity } from '../../store/cartSlice';
import { Container, Row, Col, Button, Alert, Form } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import './BasketPage.css';

const BasketPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [clientName, setClientName] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [subscriptionExpiry, setSubscriptionExpiry] = useState('');

  const fetchDraftPass = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/passes/draft/', {
        auth: { username: 'Admin', password: 'Admin' },
      });

      if (response.status === 200 && response.data.id) {
        return response.data.id;
      } else {
        console.error('Черновик заявки не найден. Ответ сервера:', response.data);
        return null;
      }
    } catch (error) {
      console.error('Ошибка при получении черновика:', error);
      return null;
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = async () => {
    try {
      const draftPassId = await fetchDraftPass();  // Получаем ID черновика
  
      if (draftPassId) {
        // Отправляем DELETE запрос для изменения статуса черновика на 'Удален'
        const response = await axios.delete(
          `http://127.0.0.1:8000/passes/${draftPassId}/delete/`,
          {
            auth: { username: 'Admin', password: 'Admin' }
          }
        );
  
        if (response.status === 200) {
          console.log('Черновик успешно помечен как удаленный');
        } else {
          console.error('Ошибка при пометке черновика как удаленного');
        }
      }
  
      // Очистить корзину
      await axios.post(
        'http://127.0.0.1:8000/cart/clear/',
        {},
        { headers: { 'Content-Type': 'application/json' },
          auth: { username: 'Admin', password: 'Admin' } }
      );
      console.log('Корзина на сервере очищена');
      dispatch(clearCart());
    } catch (error) {
      console.error('Ошибка при очистке корзины:', error);
    }
  };
  

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName || !licensePlate || !subscriptionExpiry) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    const draftPassId = await fetchDraftPass();
    if (!draftPassId) {
      alert('Не удалось найти черновик заявки. Пожалуйста, убедитесь, что черновик существует.');
      return;
    }

    const order = {
      client_name: clientName,
      license_plate: licensePlate,
      planned_deadline: subscriptionExpiry,
    };

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/passes/${draftPassId}/form/`,
        order,
        {
          headers: { 'Content-Type': 'application/json' },
          auth: { username: 'Admin', password: 'Admin' },
        }
      );

      if (response.status === 200) {
        alert('Заявка успешно сформирована!');
        dispatch(clearCart());
      } else {
        alert('Ошибка при формировании заявки.');
      }
    } catch (error) {
      alert('Произошла ошибка при отправке запроса.');
      console.error(error);
    }

    setClientName('');
    setLicensePlate('');
    setSubscriptionExpiry('');
  };

  return (
    <Container fluid>
      <Header />
      <main className="main text-center">
        <h2 className="mb-4">Абонемент</h2>
        {cartItems.length === 0 ? (
          <Alert variant="info">Абонемент пустой</Alert>
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
          Очистить абонементы
        </Button>

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
