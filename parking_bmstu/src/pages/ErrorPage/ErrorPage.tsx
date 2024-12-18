// src/pages/LoginPage/LoginPage.tsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';  // Импортируем Link
import { Container, Form, Button, Alert } from 'react-bootstrap'; // Импортируем необходимые компоненты из react-bootstrap
import { RootState, AppDispatch } from '../../store/store'; // Импортируем RootState и AppDispatch из store
import Header from '../../components/Header/Header';
import './ErrorPage.css'; // Ваши стили для страницы логина
import { Api } from '../../API/Api';

const apiInstance = new Api();

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
      <Header />

      {/* Синий контейнер для формы */}
        <h2 className="text-center">403</h2>

    </Container>
  );
};

export default LoginPage;
