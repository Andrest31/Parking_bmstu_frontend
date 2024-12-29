import React, { useState, useEffect } from 'react';
import { Container, Spinner, Button } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import './TablePage.css';
import { Link } from 'react-router-dom';

interface Pass {
  id: number;
  created_at: string;
  planned_deadline: string;
  license_plate: string;
  status: string;
  client_name: string;
  total_quantity: number;
}

interface Order {
  id: number;
  createdAt: string;
  plannedDeadline: string;
  licensePlate: string;
  status: string;
  client_name: string;
  totalQuantity: number;
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

        const passes = response.data as Pass[];
        const transformedOrders: Order[] = passes.map((pass) => ({
          id: pass.id,
          createdAt: formatDate(pass.created_at),
          plannedDeadline: formatDate(pass.planned_deadline.slice(0, 10)),
          licensePlate: pass.license_plate || 'Не указано',
          status: pass.status === 'formed' ? 'Сформирован' : pass.status,
          client_name: pass.client_name || 'Не указано',
          totalQuantity: pass.total_quantity || 0,
        }));

        setOrders(transformedOrders);
      } catch (error) {
        console.error('Ошибка при загрузке заказов:', error);
        setError('Ошибка загрузки заказов.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <Container fluid>
      <Header />
      <main className="main">
        <h2 className="mb-4 text-center">Мои абонементы</h2>

        {loading && <Spinner animation="border" variant="primary" />}

        {!loading && !error && (
          <div className="table-container">
            {/* Заголовок таблицы */}
            <div className="table-header">
              <div className="table-cell">№</div>
              <div className="table-cell">Срок действия</div>
              <div className="table-cell">Номерной знак</div>
              <div className="table-cell">Статус заявки</div>
              <div className="table-cell">ФИО клиента</div>
              <div className="table-cell">Кол-во мест</div>
              <div className="table-cell">Действия</div>
            </div>

            {/* Ряды таблицы */}
            {orders.map((order) => (
              <div key={order.id} className="table-row">
                <div className="table-cell-n">{order.id}</div>
                <div className="table-cell-pd">{order.plannedDeadline}</div>
                <div className="table-cell-lp">{order.licensePlate}</div>
                <div className="table-cell_st">{order.status}</div>
                <div className="table-cell_cn">{order.client_name}</div>
                <div className="table-cell_p">{order.totalQuantity}</div>
                <div className="table-cell table-action">
                  <Link to={`/passes/${order.id}`}>
                    <Button variant="primary" size="sm">
                      Перейти
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </Container>
  );
};

export default OrdersPage;
