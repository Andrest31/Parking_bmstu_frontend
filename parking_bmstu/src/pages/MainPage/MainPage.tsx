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
  place: string;
  sports: number;
  open_hour: number;
  close_hour: number;
  image_card: string;
  image: string;
  status: string;
}

const MainPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Основное состояние для поискового запроса
  const [tempSearchTerm, setTempSearchTerm] = useState(''); // Временное состояние для ввода пользователя
  const [parkings, setParkings] = useState<Parking[]>(CARDS_DATA); // Изначально показываем мок-данные
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [filteredCards, setFilteredCards] = useState<Parking[]>(CARDS_DATA); // По умолчанию отображаем все парковки

  // Функция для загрузки данных парковок
  useEffect(() => {
    const fetchParkingList = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const data = await fetchParkings();
        setParkings(data); // Предполагаем, что API возвращает массив парковок
        setFilteredCards(data); // Сразу обновляем filteredCards, чтобы отобразить все данные
        filterByTime(data, ''); // Применяем фильтрацию сразу, если поле поиска пустое
      } catch (error) {
        console.error('Ошибка при загрузке парковок:', error);
        setIsError(true);
        setParkings(CARDS_DATA); // Используем резервные данные при ошибке
        setFilteredCards(CARDS_DATA); // Также обновляем filteredCards для отображения всех парковок
      } finally {
        setIsLoading(false);
      }
    };

    fetchParkingList();
  }, []); // Перезагружаем парковки только при первом рендере

  // Фильтрация парковок по времени работы
  const filterByTime = (parkings: Parking[], time: string) => {
    const searchTime = parseInt(time);

    // Если введено не число, показываем все парковки
    if (isNaN(searchTime)) {
      setFilteredCards(parkings);
    } else {
      // Фильтрация по времени работы
      const timeFiltered = parkings.filter(
        (card) => card.open_hour <= searchTime && card.close_hour >= searchTime
      );

      // Сортировка по id по возрастанию
      const sortedFilteredCards = [...timeFiltered].sort((a, b) => a.id - b.id);
      setFilteredCards(sortedFilteredCards);
    }
  };

  // Обработчик кнопки поиска
  const handleSearchSubmit = () => {
    setSearchTerm(tempSearchTerm); // Обновляем основной поисковый запрос
    filterByTime(parkings, tempSearchTerm); // Применяем фильтрацию по времени сразу
  };

  return (
    <div>
      <Header />
      <div className="main">
        <h2>Аренда места</h2>
        <div className="categories">
          <p>Время работы:</p>
          <SearchBar
            value={tempSearchTerm}
            onChange={(value) => setTempSearchTerm(value)} // Сохраняем временное значение
            onSubmit={handleSearchSubmit} // Обработчик кнопки поиска
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
            {filteredCards.length === 0 ? (
              <p>Доступных парковок нет</p>
            ) : (
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
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
