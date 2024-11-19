import React, { useState, useEffect } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import './BreadCrumps.css';
import { fetchParkingById } from '../../API/parkingsApi';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [parkingName, setParkingName] = useState<string | null>(null);

  const pathnames = location.pathname.split('/').filter((x) => x);

  // Словарь для перевода маршрутов в читаемые названия
  const routeNameMap: Record<string, string> = {
    about: "О нас",
    contact: "Контакты",
    // Добавьте другие маршруты, если нужно
  };

  useEffect(() => {
    if (id) {
      const loadParkingName = async () => {
        try {
          const parking = await fetchParkingById(Number(id));
          setParkingName(parking.name);
        } catch (error) {
          console.error("Ошибка загрузки названия парковки:", error);
          setParkingName("Неизвестная парковка");
        }
      };
      loadParkingName();
    }
  }, [id]);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb custom-breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Парковки</Link>
        </li>
        {pathnames.map((value, index) => {
          if (value === "parking") return null; // Убираем элемент "Парковка"

          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const breadcrumbLabel = id && value === id 
            ? parkingName || id 
            : routeNameMap[value] || value; // Используем словарь

          return (
            <li key={to} className="breadcrumb-item">
              <Link to={to}>{breadcrumbLabel}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
