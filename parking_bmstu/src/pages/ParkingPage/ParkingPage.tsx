import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './style-second.css';

interface ParkingDetailsProps {
  parking: {
    name: string;
    sports: number;
    open_hour: string;
    close_hour: string;
    image_url: string;
  };
}

const ParkingPage: React.FC<ParkingDetailsProps> = ({ parking }) => {
  return (
    <div>
      <Header />
      <main>
        <div className="hero">
          <h2>Аренда места у {parking.name}</h2>
          <div className="image-container">
            <img src={parking.image_url} alt={parking.name} />
          </div>
        </div>
        <section className="info-cards">
          <div className="card">
            <h3>Количество мест</h3>
            <p>{parking.sports}</p>
          </div>
          <div className="card">
            <h3>Время открытия</h3>
            <p>{parking.open_hour}</p>
          </div>
          <div className="card">
            <h3>Время закрытия</h3>
            <p>{parking.close_hour}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ParkingPage;
