// components/Breadcrumbs.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import './BreadCrumps.css'
import { fetchParkingById } from '../../API/parkingsApi'; // Импорт API-запроса

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [parkingName, setParkingName] = useState<string | null>(null);

  const pathnames = location.pathname.split('/').filter((x) => x);

  // Загружаем имя парковки, если текущий URL включает её ID
  useEffect(() => {
    if (id) {
      const loadParkingName = async () => {
        try {
          const parking = await fetchParkingById(Number(id));
          setParkingName(parking.name);
        } catch (error) {
          console.error("Ошибка загрузки названия парковки:", error);
          setParkingName("Неизвестная парковка"); // Фолбэк на случай ошибки
        }
      };
      loadParkingName();
    }
  }, [id]);

  return (
    <div className="breadcrumbs">
      <Link to="/">Парковки</Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        // Условие для показа "Парковка > [Имя парковки]"
        let breadcrumbLabel = value;
        if (value === 'parking') {
          breadcrumbLabel = '';
        } else if (id && value === id) {
          breadcrumbLabel = parkingName || id;
        }

        return (
          <span key={to}>
            {' '}
            <Link to={to}>{breadcrumbLabel}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
