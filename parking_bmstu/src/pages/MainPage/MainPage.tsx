import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ParkingCard from '../../components/Card/Card';
import SearchBar from '../../components/SearchBar/SearchBar';
import { CARDS_DATA } from '../../modules/mock';
import './MainPage.css';
import { fetchParkings } from '../../API/parkingsApi';

interface Parking {
  id: number;
  name: string;
  image_card: string;
  image: string;
  sports: number;
  open_hour: number;
  close_hour: number;
}

const MainPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [parkings, setParkings] = useState<Parking[]>(CARDS_DATA); // Изначально показываем мок-данные
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchParkingList = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const data = await fetchParkings({ name: searchTerm });
        setParkings(data); // Предполагаем, что API возвращает массив парковок
      } catch (error) {
        console.error('Ошибка при загрузке парковок:', error);
        setIsError(true); 
        setParkings(CARDS_DATA); // Используем резервные данные при ошибке
      } finally {
        setIsLoading(false);
      }
    };

    fetchParkingList();
  }, [searchTerm]);

  const filteredCards = parkings.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="main">
        <h2>Аренда места</h2>
        <div className="categories">
          <p>Время работы: </p>
          <SearchBar
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
            onSubmit={() => console.log(`Поиск: ${searchTerm}`)}
          />
        </div>
        {isLoading ? (
          <p>Загрузка парковок...</p>
        ) : (
          <div>
            {isError && (
              <p style={{ color: 'red' }}>
                Не удалось подключиться к базе данных. Показаны резервные данные.
              </p>
            )}
            <div className="product-list">
              {filteredCards.map((card) => (
                <ParkingCard
                  key={card.id}
                  id={card.id}
                  name={card.name}
                  imageCard={card.image_card || 'http://localhost:9000/mini/images/img1.jpg'}
                  spots={card.sports}
                  openHour={card.open_hour}
                  closeHour={card.close_hour}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
