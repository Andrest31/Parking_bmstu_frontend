import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Api } from '../../API/Api';
import { Link } from 'react-router-dom';  // Импортируем Link
import Header from '../../components/Header/Header';
import './RegisterPage.css'

const apiInstance = new Api();

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            // Формируем строку для базовой аутентификации

            // Отправляем запрос с заголовком Authorization
            await apiInstance.users.usersRegisterCreate({ username, password }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            
            setSuccess(true);
            setUsername("");
            setPassword("");
        } catch (err) {
            setError("Ошибка регистрации. Проверьте данные или повторите попытку.");
        }
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
            <Header />
            
            {/* Синий контейнер для формы */}
            <div className="register-container p-4 bg-primary text-white rounded shadow-lg">
                <h2 className="text-center">Регистрация</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username" className="mb-3">
                        <Form.Label classname="log">username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="password" className="mb-3">
                        <Form.Label classname="pass">password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">Регистрация прошла успешно!</Alert>}
                    <Button variant="light" type="submit" className="w-100">
                        Зарегистрироваться
                    </Button>
                </Form>

                {/* Добавляем ссылку на страницу Входа */}
                <div className="mt-3 text-center">
                    <p>
                        Уже есть аккаунт? <Link to="/login" className="text-light">Войти</Link>
                    </p>
                </div>
            </div>
        </Container>
    );
};

export default RegisterPage;
