import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ParkingCard from '../../components/Card/Card';
import SearchBar from '../../components/SearchBar/SearchBar';
import { CARDS_DATA } from '../../modules/mock';
import './MainPage.css';

const MainPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCards = CARDS_DATA.filter((card) =>
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
            onSubmit={() => console.log(`Search: ${searchTerm}`)}
          />
        </div>
        <div className="product-list">
          {filteredCards.map((card) => (
            <ParkingCard
              key={card.id}
              id={card.id}
              name={card.name}
              imageCard={card.imageCard}
              spots={card.spots}
              openHour={card.openHour}
              closeHour={card.closeHour}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
