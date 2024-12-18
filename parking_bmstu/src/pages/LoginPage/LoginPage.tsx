// src/pages/LoginPage/LoginPage.tsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';  // Импортируем Link
import { Container, Form, Button, Alert } from 'react-bootstrap'; // Импортируем необходимые компоненты из react-bootstrap
import { RootState, AppDispatch } from '../../store/store'; // Импортируем RootState и AppDispatch из store
import { loginUser } from '../../store/userSlice';  // Импортируем экшен для авторизации
import Header from '../../components/Header/Header';
import './LoginPage.css'; // Ваши стили для страницы логина
import { Api } from '../../API/Api';

const apiInstance = new Api();

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Получаем состояние из Redux (loading, error)
  const { loading, error } = useSelector((state: RootState) => state.user);

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Диспатчим экшен loginUser с переданными данными
    const result = await dispatch(loginUser({ username, password }));

      // Формируем строку для базовой аутентификации
    
      // Отправляем запрос с заголовком Authorization
      await apiInstance.login.loginCreate({ username, password }, {
          withCredentials: true,
          headers: {
              'Content-Type': 'application/json',
          }
      });


    // Если авторизация успешна (получен fulfilled ответ)
    if (loginUser.fulfilled.match(result)) {
      navigate('/profile'); // Переход на главную страницу (или на другую, в зависимости от требований)
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
      <Header />

      {/* Синий контейнер для формы */}
      <div className="register-container p-4 bg-primary text-white rounded shadow-lg">
        <h2 className="text-center">Вход</h2>

        {/* Если есть ошибка авторизации, отображаем Alert */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Форма для входа */}
        <Form onSubmit={handleSubmit}>
          {/* Поле для username */}
          <Form.Group controlId="username" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          {/* Поле для password */}
          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {/* Кнопка отправки формы */}
          <Button variant="light" type="submit" className="w-B" disabled={loading}>
            Войти
          </Button>
        </Form>

        {/* Ссылка на страницу регистрации */}
        <div className="mt-3 text-center">
          <p>
            Нет аккаунта? <Link to="/register" className="text-light">Зарегистрироваться</Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
