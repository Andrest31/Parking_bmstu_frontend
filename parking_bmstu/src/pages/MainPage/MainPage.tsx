import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './MainPage.css';
import { CARDS_DATA } from '../../modules/mock';

const MainPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="main">
        <h2>Аренда места</h2>
        <a href="#" className="cart-button">
          <img src="/src/assets/images/cart-icon.png" alt="Корзина" className="cart-icon" />
          <span className="cart-count">0</span>
        </a>
        <div className="categories">
          <p>Время работы: </p>
          <form>
            <input type="text" className="search" placeholder="Поиск" />
            <button type="submit" className="submit">Найти</button>
          </form>
        </div>
        <div className="product-list">
          {CARDS_DATA.map(card => (
            <div className="product" key={card.id}>
              <div className="product-card">
                <div className="image-container">
                  <img src={card.imageCard} alt={card.name} />
                </div>
                <div className="name-pr-container">
                  <div className="name">{card.name}</div>
                  <div className="pr">
                    {/* Ссылка на страницу парковки */}
                    <Link to={`/parking/${card.id}`} className="details-link">
                      подробнее &gt;
                    </Link>
                  </div>
                  <div className="text">Количество мест: {card.spots}</div>
                  <div className="text">
                    Время работы: {card.openHour}:00 - {card.closeHour}:00
                  </div>
                </div>
                <form className="quantity-form">
                  <input type="number" min="0" max={card.spots} className="quantity-input" required />
                  <button type="submit" className="add-to-cart-button">Арендовать</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
