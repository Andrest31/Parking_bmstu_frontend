import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Alert, Table } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import './TablePage.css';
import { Link } from 'react-router-dom';

interface Pass {
  id: number;
  created_at: string; // Дата создания
  planned_deadline: string; // Планируемый дедлайн
  license_plate: string; // Номерной знак
  status: string; // Статус
  client_name: string; // ФИО клиента
  total_quantity: number; // Общее количество мест
}

interface Order {
  id: number;
  createdAt: string;
  plannedDeadline: string;
  licensePlate: string;
  status: string;
  client_name: string;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/passes/', {
          params: {
            start_date: '2024-01-01',
            end_date: '2024-12-31',
            status: 'formed',
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response); // Проверьте вывод данных в консоли


        const passes = response.data as Pass[];
        const transformedOrders: Order[] = passes.map((pass) => ({
          id: pass.id,
          createdAt: pass.created_at || 'Не указана',
          plannedDeadline: pass.planned_deadline || 'Не указана',
          licensePlate: pass.license_plate || 'Не указано',
          status: pass.status || 'Неизвестно',
          client_name: pass.client_name || 'Не указано',
        }));

        setOrders(transformedOrders);
        console.log(transformedOrders); // Проверьте вывод данных в консоли
      } catch (error) {
        console.error('Ошибка при загрузке заказов:', error);
        setError('Ошибка загрузки заказов.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container fluid>
      <Header />
      <main className="main text-center">
        <h2 className="mb-4">Мои заказы</h2>

        {loading && <Spinner animation="border" variant="primary" />}
        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && (
          <Row classname="Rows">
            {orders.length === 0 ? (
              <Col>
                <Alert variant="info">Нет заказов</Alert>
              </Col>
            ) : (
              <Col xs={12}>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Абонемент</th>
                      <th>Срок действия</th>
                      <th>Номерной знак</th>
                      <th>Статус</th>
                      <th>ФИО клиента</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.plannedDeadline}</td>
                        <td>{order.licensePlate}</td>
                        <td>{order.status}</td>
                        <td>{order.client_name}</td>
                        <td>
                        <Link to={`/passes/${order.id}`}>
                          <Button variant="primary" size="sm" className="me-2">
                            Подробнее
                          </Button>
                        </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            )}
          </Row>
        )}
      </main>
      <Footer />
    </Container>
  );
};

export default OrdersPage;
