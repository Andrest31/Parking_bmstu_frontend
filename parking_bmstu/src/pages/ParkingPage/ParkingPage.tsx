import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Image, Breadcrumb, Spinner, Alert } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Breadcrumbs from '../../components/BreadCrumps/BreadCrumps';
import { CARDS_DATA } from '../../modules/mock';
import { fetchParkingById } from '../../API/parkingsApi';
import './ParkingPage.css';

const ParkingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [parking, setParking] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchParkingDetails = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const data = await fetchParkingById(Number(id));
        setParking(data);
      } catch (error) {
        console.error('Ошибка при загрузке парковки:', error);
        setIsError(true);
        const fallbackParking = CARDS_DATA.find((card) => card.id === parseInt(id || '0'));
        setParking(fallbackParking || null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParkingDetails();
  }, [id]);

  if (isLoading) {
    return <Spinner animation="border" role="status"><span className="visually-hidden">Загрузка...</span></Spinner>;
  }

  if (!parking) {
    return <Alert variant="danger">Парковка не найдена</Alert>;
  }

  return (
    <Container fluid>
      <Header />
      <Breadcrumbs />
      <main>
        <section className="hero bg-dark text-white p-5">
          <Container>
            <h2>Аренда места у {parking.name}</h2>
            {isError && <Alert variant="warning">Не удалось подключиться к базе данных. Показаны резервные данные.</Alert>}
            <Image src={parking.image || 'http://localhost:9000/mini/images/building1.jpg'} fluid />
          </Container>
        </section>
        
        {/* Контейнер для карточек */}
        <Container className="my-4">
          <Row className="info-cards">
            {/* Карточка 1 */}
            <Col md={4} className="d-flex justify-content-center mb-3">
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Количество мест</Card.Title>
                  <Card.Text>{parking.sports}</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Карточка 2 */}
            <Col md={4} className="d-flex justify-content-center mb-3">
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Время открытия</Card.Title>
                  <Card.Text>{parking.open_hour}:00</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Карточка 3 */}
            <Col md={4} className="d-flex justify-content-center mb-3">
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Время закрытия</Card.Title>
                  <Card.Text>{parking.close_hour}:00</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </Container>
  );
};

export default ParkingPage;
