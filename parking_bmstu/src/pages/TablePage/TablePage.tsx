// src/pages/OrdersPage/OrdersPage.tsx

import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Api } from '../../API/Api';
import './TablePage.css';

// Интерфейс для данных, получаемых из API
interface Pass {
  id: number;
  start_date: string; // Дата начала
  location?: string; // Место (например, "ГЗ" или "Г2")
  spots: number; // Количество мест
  status: string; // Статус заявки
}

// Интерфейс для отображаемых заказов
interface Order {
  id: number;
  date: string;
  place: string;
  spots: number;
  status: string;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]); // Заказы пользователя
  const [loading, setLoading] = useState<boolean>(true); // Состояние загрузки
  const [error, setError] = useState<string | null>(null); // Ошибка загрузки

  const apiInstance = new Api();

  // Загрузка заказов при монтировании компонента
  useEffect(() => {
    // Загрузка данных с API
const fetchOrders = async () => {
  try {
    const queryParams = {
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      status: 'completed',
    };

    // Явно указываем тип для response.data
    const response = await apiInstance.passes.passesList(queryParams);
    const passes = response.data as Pass[]; // Явное указание типа

    // Преобразуем Pass[] в Order[]
    const transformedOrders: Order[] = passes.map((pass: Pass) => ({
      id: pass.id,
      date: pass.start_date || 'Не указана',
      place: pass.location || 'Не указано',
      spots: pass.spots || 0,
      status: pass.status || 'Неизвестно',
    }));

    setOrders(transformedOrders);
  } catch (error) {
    setError('Ошибка загрузки заказов.');
  } finally {
    setLoading(false);
  }
};


    fetchOrders(); // Вызов функции
  }, []);

  return (
    <Container fluid>
      <Header />
      <main className="main text-center">
        <h2 className="mb-4">Мои заказы</h2>

        {/* Спиннер загрузки */}
        {loading && <Spinner animation="border" variant="primary" />}

        {/* Сообщение об ошибке */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Таблица заказов */}
        {!loading && !error && (
          <Row>
            <Col xs={12} className="mb-4">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID заказа</th>
                    <th>Дата</th>
                    <th>Место</th>
                    <th>Количество мест</th>
                    <th>Статус</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={6}>Нет заказов</td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.date}</td>
                        <td>{order.place}</td>
                        <td>{order.spots}</td>
                        <td>{order.status}</td>
                        <td>
                          <Button variant="primary" size="sm" className="me-2">
                            Подробнее
                          </Button>
                          <Button variant="danger" size="sm">
                            Отменить
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        )}
      </main>
      <Footer />
    </Container>
  );
};

export default OrdersPage;
