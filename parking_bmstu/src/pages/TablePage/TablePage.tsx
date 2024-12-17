// src/pages/OrdersPage/OrdersPage.tsx

import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './TablePage.css';

// Пример данных заказов (можно заменить на API запрос)
interface Order {
  id: number;
  date: string;
  place: string;
  spots: number;
  status: string;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Эмулируем загрузку данных (например, из API)
  useEffect(() => {
    // Пример данных, которые могут быть загружены с API
    const fetchOrders = async () => {
      const fetchedOrders: Order[] = [
        { id: 1, date: '2024-12-17', place: 'ГЗ', spots: 1, status: 'В обработке' },
        { id: 2, date: '2024-12-16', place: 'Г2', spots: 2, status: 'Завершено' },
        { id: 3, date: '2024-12-15', place: 'Г1', spots: 1, status: 'Отменено' },
      ];
      setOrders(fetchedOrders); // Устанавливаем данные в состояние
    };

    fetchOrders();
  }, []);

  return (
    <Container fluid>
      <Header />
      <main className="main text-center">
        <h2 className="mb-4">Мои заказы</h2>
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
      </main>
      <Footer />
    </Container>
  );
};

export default OrdersPage;
