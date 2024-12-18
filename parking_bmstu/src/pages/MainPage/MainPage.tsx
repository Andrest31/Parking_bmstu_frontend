import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setSearchTerm } from '../../store/features/filtersSlice';
import { addToCart } from '../../store/cartSlice'; // Импорт экшена для добавления в корзину
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ParkingCard from '../../components/Card/Card';
import SearchBar from '../../components/SearchBar/SearchBar';
import { CARDS_DATA } from '../../modules/mock';
import { fetchParkings } from '../../API/parkingsApi';
import Breadcrumbs from '../../components/BreadCrumps/BreadCrumps';
import './MainPage.css';
import defaultImage from '../../modules/img1.jpg';
import axios from 'axios';

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

interface CartItem {
  id: number;
  name: string;
  imageCard: string;
  quantity: number;
  place: string;
  spots: number;
  orderId?: number; // Добавили поле orderId
}

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.filters.searchTerm);
  const [tempSearchTerm, setTempSearchTerm] = useState(searchTerm);
  const [parkings, setParkings] = useState<Parking[]>(CARDS_DATA);
  const [filteredCards, setFilteredCards] = useState<Parking[]>(CARDS_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Функция для добавления парковки в черновик
  const addToDraft = async (card: Parking) => {
    try {
      // Замените URL на ваш реальный URL для добавления парковки в черновик
      const response = await axios.post(`http://127.0.0.1:8000/parkings/${card.id}/add-to-draft/`, {
        status: 'draft',
        // Можно добавить дополнительные данные, если необходимо
      });
      return response.data; // Ответ сервера с информацией о добавленной парковке
    } catch (error) {
      console.error('Ошибка при добавлении парковки в черновик:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchParkingList = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const data = await fetchParkings();
        setParkings(data);
      } catch (error) {
        console.error('Ошибка при загрузке парковок:', error);
        setIsError(true);
        setParkings(CARDS_DATA);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParkingList();
  }, []);

  useEffect(() => {
    setTempSearchTerm(searchTerm);

    const filterByTime = (parkings: Parking[], time: string) => {
      const searchTime = parseInt(time, 10);

      if (isNaN(searchTime) || time === '') {
        return parkings;
      }

      return parkings.filter(
        (parking) => parking.open_hour <= searchTime && parking.close_hour >= searchTime
      );
    };

    const filtered = filterByTime(parkings, searchTerm);
    setFilteredCards(filtered);
  }, [searchTerm, parkings]);

  const handleSearchSubmit = () => {
    dispatch(setSearchTerm(tempSearchTerm));
  };

  const handleAddToCart = async (card: Parking) => {
    if (cartItems.length === 0) {
      // Если корзина пуста, создаем новый заказ
      const newOrderId = await addToDraft(card); // Создаем заказ и добавляем парковку
      if (newOrderId) {
        console.log('Парковка добавлена в черновик:', newOrderId);
        // Добавляем товар в корзину с новым заказом
        dispatch(addToCart({ 
          id: card.id, 
          name: card.name, 
          imageCard: card.image_card || defaultImage, 
          orderId: newOrderId // Добавляем поле orderId
        }));
      }
    } else {
      // Если корзина не пуста, просто добавляем товар
      dispatch(addToCart({ 
        id: card.id, 
        name: card.name, 
        imageCard: card.image_card || defaultImage 
      }));
    }
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
                  <Col key={card.id} xs={12} md={4} className="mb-4">
                    <ParkingCard
                      id={card.id}
                      name={card.name}
                      imageCard={card.image_card || defaultImage}
                      spots={card.sports}
                      openHour={card.open_hour}
                      closeHour={card.close_hour}
                    />
                    <Button variant="primary" onClick={() => handleAddToCart(card)}>
                      Добавить в корзину
                    </Button>
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
