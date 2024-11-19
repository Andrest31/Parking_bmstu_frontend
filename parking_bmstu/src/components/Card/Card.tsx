import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';
import defaultImage from '../../modules/img1.jpg';

interface ParkingCardProps {
  id: number;
  name: string;
  imageCard: string;
  spots: number;
  openHour: number;
  closeHour: number;
}

const ParkingCard: React.FC<ParkingCardProps> = ({ id, name, imageCard, spots, openHour, closeHour }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/parking/${id}`);
  };

  return (
    <div className="parking-card" onClick={handleCardClick}>
      <div className="product-card">
        <div className="image-container">
          <img src={imageCard || defaultImage} alt={name} 
          onError={(e) => (e.currentTarget.src = defaultImage)}
          />
        </div>
        <div className="name-pr-container">
          <div className="name">{name}</div>
          <div className="text">Количество мест: {spots}</div>
          <div className="text">Время работы: {openHour}:00 - {closeHour}:00</div>
        </div>
      </div>
    </div>
  );
};

export default ParkingCard;
