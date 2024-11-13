import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ParkingCard from '../../components/Card/Card';
import SearchBar from '../../components/SearchBar/SearchBar';
import { CARDS_DATA } from '../../modules/mock';
import { fetchParkings } from '../../API/parkingsApi';
import Breadcrumbs from '../../components/BreadCrumps/BreadCrumps';
import './MainPage.css'

interface Parking {
  id: number;
  name: string;
  place: string;
  sports: number;
  open_hour: number;
  close_hour: number;
  image_card: string;
  image: string;
  status: string;
}

const MainPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tempSearchTerm, setTempSearchTerm] = useState('');
  const [parkings, setParkings] = useState<Parking[]>(CARDS_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [filteredCards, setFilteredCards] = useState<Parking[]>(CARDS_DATA);

  useEffect(() => {
    const fetchParkingList = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const data = await fetchParkings();
        setParkings(data);
        setFilteredCards(data);
        filterByTime(data, '');
      } catch (error) {
        console.error('Ошибка при загрузке парковок:', error);
        setIsError(true);
        setParkings(CARDS_DATA);
        setFilteredCards(CARDS_DATA);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParkingList();
  }, []);

  const filterByTime = (parkings: Parking[], time: string) => {
    const searchTime = parseInt(time);

    if (isNaN(searchTime)) {
      setFilteredCards(parkings);
    } else {
      const timeFiltered = parkings.filter(
        (card) => card.open_hour <= searchTime && card.close_hour >= searchTime
      );
      const sortedFilteredCards = [...timeFiltered].sort((a, b) => a.id - b.id);
      setFilteredCards(sortedFilteredCards);
    }
  };

  const handleSearchSubmit = () => {
    setSearchTerm(tempSearchTerm);
    filterByTime(parkings, tempSearchTerm);
  };

  return (
    <Container fluid>
      <Header />
      <Breadcrumbs />
      <main className="main text-center">
        <h2 className="mb-4">Аренда места</h2>
        <div className="categories d-flex justify-content-center align-items-center">
          <p className="mb-0">Время работы:</p>
          <SearchBar
            value={tempSearchTerm}
            onChange={(value) => setTempSearchTerm(value)}
            onSubmit={handleSearchSubmit}
          />
        </div>
        {isLoading ? (
          <Spinner animation="border" role="status" className="mt-4">
            <span className="visually-hidden">Загрузка...</span>
          </Spinner>
        ) : (
          <div>
            {isError && (
              <Alert variant="danger">
                Не удалось подключиться к базе данных. Показаны резервные данные.
              </Alert>
            )}
            {filteredCards.length === 0 ? (
              <p className="text-muted">Доступных парковок нет</p>
            ) : (
              <Row className="product-list">
                {filteredCards.map((card) => (
                  <Col key={card.id} md={4} className="mb-4">
                    <ParkingCard
                      id={card.id}
                      name={card.name}
                      imageCard={card.image_card || 'http://localhost:9000/mini/images/img1.jpg'}
                      spots={card.sports}
                      openHour={card.open_hour}
                      closeHour={card.close_hour}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </div>
        )}
      </main>
      <Footer />
    </Container>
  );
};

export default MainPage;
