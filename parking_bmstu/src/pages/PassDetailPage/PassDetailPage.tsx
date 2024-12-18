import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Для получения id заявки из URL
import { Container, Row, Col, Button, Alert, Table } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import './PassDetailPage.css';

// Интерфейс для информации о парковке
interface Parking {
  id: number;
  name: string;
  location: string;
  quantity: number;
}

// Интерфейс для информации о заявке
interface OrderDetails {
  id: number;
  client_name: string;
  license_plate: string;
  status: string;
  planned_date: string;
  planned_deadline: string;
  selected_parkings: Parking[]; // Массив парковок, выбранных в заявке
}

const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>(); // Получаем ID заявки из URL
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/passes/${orderId}/`);
        const data = response.data;

        // Формируем объект с данными о заявке
        const order: OrderDetails = {
          id: data.id,
          client_name: data.client_name,
          license_plate: data.license_plate,
          status: data.status,
          planned_date: data.planned_date,
          planned_deadline: data.planned_deadline,
          selected_parkings: data.parkings.map((p: any) => ({
            id: p.parking.id,
            name: p.parking.name,
            location: p.parking.place,
            quantity: p.quantity, // Получаем количество из PassParking
          })),
        };

        setOrderDetails(order);
      } catch (error) {
        console.error('Ошибка при загрузке данных заявки:', error);
        setError('Ошибка при загрузке данных заявки');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  return (
    <Container fluid>
      <Header />
      <main className="main text-center">
        <h2 className="mb-4">Детали абонемента #{orderId}</h2>

        {/* Сообщения о статусе */}
        {loading && <Alert variant="info">Загрузка...</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Отображение информации о заказе */}
        {orderDetails && !loading && !error && (
          <>
            <Row className="justify-content-center">
              <Col xs={12} lg={8}>
                <h4>Информация об абонементе</h4>
                <Table striped bordered hover responsive>
                  <tbody>
                    <tr>
                      <th>ID абонемента</th>
                      <td>{orderDetails.id}</td>
                    </tr>
                    <tr>
                      <th>ФИО клиента</th>
                      <td>{orderDetails.client_name}</td>
                    </tr>
                    <tr>
                      <th>Гос. номер</th>
                      <td>{orderDetails.license_plate}</td>
                    </tr>
                    <tr>
                      <th>Статус</th>
                      <td>{orderDetails.status}</td>
                    </tr>
                    <tr>
                      <th>Срок действия</th>
                      <td>{orderDetails.planned_deadline}</td>
                    </tr>
                  </tbody>
                </Table>

                <h4 className="mt-4">Выбранные парковки</h4>
                {orderDetails.selected_parkings.length === 0 ? (
                  <Alert variant="info">Парковки не выбраны</Alert>
                ) : (
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Название</th>
                        <th>Местоположение</th>
                        <th>Количество</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails.selected_parkings.map((parking, index) => (
                        <tr key={parking.id}>
                          <td>{parking.name}</td>
                          <td>{parking.location}</td>
                          <td>{parking.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
                <Button variant="primary" onClick={() => window.history.back()}>
                  Назад
                </Button>
              </Col>
            </Row>
          </>
        )}
      </main>
      <Footer />
    </Container>
  );
};

export default OrderDetailsPage;
