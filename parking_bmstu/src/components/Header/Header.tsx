import React from 'react';
import './Header.css'; // Добавьте стили для компонента

const Header: React.FC = () => {
  return (
    <header>
      <a href="/" className="headout">
        <div>
          <h1>1830</h1>
        </div>
      </a>
    </header>
  );
};

export default Header;
