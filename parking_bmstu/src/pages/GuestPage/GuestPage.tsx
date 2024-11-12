// src/pages/GuestPage/GuestPage.tsx
import React from 'react';
import Header from '../../components/Header/Header';
import Breadcrumbs from '../../components/BreadCrumps/BreadCrumps';
import './GuestPage.css'; // Если нужно, добавьте стили для GuestPage

const GuestPage: React.FC = () => {
  return (
    <div>
      <Header /> {/* Добавляем Navbar сюда */}
      <Breadcrumbs /> {/* Добавляем Breadcrumbs сюда */}
      <main>
        <h1>О нас</h1>
        <p>Информация о нас...</p>
      </main>
    </div>
  );
};

export default GuestPage;
