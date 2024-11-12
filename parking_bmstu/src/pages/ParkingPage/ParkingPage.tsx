// src/pages/ParkingPage/ParkingPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './ParkingPage.css';
import { CARDS_DATA } from '../../modules/mock'; // Импортируем мок-данные
import { fetchParkingById } from '../../API/parkingsApi';

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
        setParking(data); // Данные из API
      } catch (error) {
        console.error('Ошибка при загрузке парковки:', error);
        setIsError(true);
        const fallbackParking = CARDS_DATA.find((card) => card.id === parseInt(id || '0'));
        setParking(fallbackParking || null); // Используем мок-данные
      } finally {
        setIsLoading(false);
      }
    };

    fetchParkingDetails();
  }, [id]);

  if (isLoading) {
    return <p>Загрузка данных о парковке...</p>;
  }

  if (!parking) {
    return <p>Парковка не найдена</p>;
  }

  return (
    <div>
      <Header />
      <main>
        <div className="hero">
          <h2>Аренда места у {parking.name}</h2>
          {isError && <p style={{ color: 'red' }}>Не удалось подключиться к базе данных. Показаны резервные данные.</p>}
          <div className="image-container">
            <img src={parking.image || 'http://localhost:9000/mini/images/building1.jpg'} alt={parking.name} />
          </div>
        </div>
        <section className="info-cards">
          <div className="card">
            <h3>Количество мест</h3>
            <p>{parking.sports}</p>
          </div>
          <div className="card">
            <h3>Время открытия</h3>
            <p>{parking.open_hour}:00</p>
          </div>
          <div className="card">
            <h3>Время закрытия</h3>
            <p>{parking.close_hour}:00</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ParkingPage;
