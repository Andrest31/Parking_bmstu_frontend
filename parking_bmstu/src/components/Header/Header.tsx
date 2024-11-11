import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Добавьте стили для компонента

const Header: React.FC = () => {
  return (
    <header>
      <a href="/" className="headout">
        <div>
          <Link to={`/`}>
            <h1>1830</h1>
          </Link>
        </div>
      </a>
    </header>
  );
};

export default Header;
