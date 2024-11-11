import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './ParkingPage.css';
import { CARDS_DATA } from '../../modules/mock';

const ParkingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const parking = CARDS_DATA.find(card => card.id === parseInt(id || '', 10));

  if (!parking) {
    return (
      <div>
        <Header />
        <main>
          <div className="error">
            <h2>Парковка не найдена</h2>
            <p>Пожалуйста, вернитесь на главную страницу и выберите другую парковку.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main>
        <div className="hero">
          <h2>Аренда места у {parking.name}</h2>
          <div className="image-container">
            <img src={parking.image} alt={parking.name} />
          </div>
        </div>
        <section className="info-cards">
          <div className="card">
            <h3>Количество мест</h3>
            <p>{parking.spots}</p>
          </div>
          <div className="card">
            <h3>Время открытия</h3>
            <p>{parking.openHour}:00</p>
          </div>
          <div className="card">
            <h3>Время закрытия</h3>
            <p>{parking.closeHour}:00</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ParkingPage;
