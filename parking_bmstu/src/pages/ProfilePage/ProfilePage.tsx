// src/pages/ProfilePage/ProfilePage.tsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Импортируем useSelector для доступа к данным из Redux
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { loginUser } from '../../store/userSlice';  // Экшен для авторизации
import { RootState } from '../../store/store';  // Импортируем RootState для использования useSelector
import { Api } from '../../API/Api';
import './ProfilePage.css';

const apiInstance = new Api();

const ProfilePage: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [feedback, setFeedback] = useState<{ type: string, message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Получаем информацию о текущем пользователе из состояния Redux
  const { user } = useSelector((state: RootState) => state.user);

  // Проверка, что пользователь авторизован
  if (!user) {
    return <div>Пожалуйста, авторизуйтесь, чтобы просматривать страницу профиля.</div>;
  }

  // Извлекаем имя пользователя и его ID
  const username = user.username;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null); 
    setError(null); 

    // Проверка совпадения паролей
    if (newPassword !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (!username) {
      setError("Имя пользователя не найдено");
      return;
    }

    try {
      // Получаем CSRF токен из cookies (если требуется)
      const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrftoken="))
        ?.split("=")[1];

      if (!csrfToken) {
        throw new Error("CSRF-токен отсутствует.");
      }

      // Отправляем запрос на изменение пароля
      const response = await apiInstance.users.usersRegisterUpdate(userId, { password: newPassword }, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': csrfToken, // Добавляем CSRF токен в заголовки
        }
      });

      if (response.status === 200) {
        setSuccess("Пароль успешно обновлен");
        setError(null);

        // Выйти из системы или авторизоваться с новым паролем
        await dispatch(loginUser({ username, password: newPassword }));

        // Перенаправляем пользователя обратно на страницу профиля
        navigate("/profile");
      } else {
        throw new Error("Ошибка при обновлении пароля.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setFeedback({ type: "error", message: `Не удалось обновить пароль: ${err.message}` });
      } else {
        setFeedback({ type: "error", message: "Не удалось обновить пароль" });
      }
      setSuccess(null);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Добро пожаловать, {username}!</h2> {/* Отображаем имя пользователя */}
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      {feedback && <Alert variant={feedback.type}>{feedback.message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="currentPassword">
          <Form.Label>Текущий пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введите текущий пароль"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="newPassword">
          <Form.Label>Новый пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введите новый пароль"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Подтвердите новый пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Подтвердите новый пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" className="mt-3" variant="primary">
          Сохранить
        </Button>
      </Form>
    </Container>
  );
};

export default ProfilePage;
