import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setSearchTerm } from '../../store/features/filtersSlice';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ParkingCard from '../../components/Card/Card';
import SearchBar from '../../components/SearchBar/SearchBar';
import { CARDS_DATA } from '../../modules/mock';
import { fetchParkings } from '../../API/parkingsApi';
import Breadcrumbs from '../../components/BreadCrumps/BreadCrumps';
import './MainPage.css';
import defaultImage from '../../modules/img1.jpg';

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
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.filters.searchTerm);
  const [tempSearchTerm, setTempSearchTerm] = useState(searchTerm); // Временное значение для инпута
  const [parkings, setParkings] = useState<Parking[]>(CARDS_DATA);
  const [filteredCards, setFilteredCards] = useState<Parking[]>(CARDS_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchParkingList = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const data = await fetchParkings();
        setParkings(data);
        setFilteredCards(data);
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

  const handleSearchSubmit = () => {
    dispatch(setSearchTerm(tempSearchTerm)); // Устанавливаем значение фильтра только при отправке
    const filterByTime = (parkings: Parking[], time: string) => {
      const searchTime = parseInt(time, 10);

      if (isNaN(searchTime)) {
        return parkings; // Если время не введено, показываем все парковки
      }

      return parkings.filter(
        (parking) => parking.open_hour <= searchTime && parking.close_hour >= searchTime
      );
    };

    const filtered = filterByTime(parkings, tempSearchTerm);
    setFilteredCards(filtered);
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
            onChange={(value) => setTempSearchTerm(value)} // Обновляем временное значение
            onSubmit={handleSearchSubmit} // Фильтруем только при нажатии Enter
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
                  <Col key={card.id} xs={12} md={4} className="mb-4"> {/* xs=12 для отображения в одну колонку на узких экранах */}
                    <ParkingCard
                      id={card.id}
                      name={card.name}
                      imageCard={card.image_card || defaultImage}
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
