import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store'; // Импорт Redux Store
import './index.css';
import App from './App';

// Условие для регистрации сервис-воркера только в продакшн-режиме
if (process.env.NODE_ENV === 'production') {
  // Проверка, поддерживает ли браузер сервис-воркеры
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Регистрация сервис-воркера с учетом базового пути
      navigator.serviceWorker.register('/Parking_bmstu_frontend/service-worker.js') // Укажите корректный путь
        .then((registration) => {
          console.log('Service Worker зарегистрирован с областью: ', registration.scope);
        })
        .catch((error) => {
          console.log('Ошибка регистрации Service Worker: ', error);
        });
    });
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
