import React from 'react';
import Header from '../../components/Header/Header';
import Breadcrumbs from '../../components/BreadCrumps/BreadCrumps';
import { Container, Row, Col } from 'react-bootstrap';
import './GuestPage.css';

const GuestPage: React.FC = () => {
  return (
    <div className="guest-page">
      <Header />
      <div className="bread">
        <Breadcrumbs />
      </div>
      <div className="background-overlay">
        <Container className="d-flex justify-content-center align-items-center vh-100">
          <Row>
            <Col className="text-center">
              <h1>Добро пожаловать!</h1>
              <p>
                Мы рады видеть вас на нашей странице. Узнайте больше о нас! Данная
                система предназначена для хранения справочных данных о бронировании
                парковочных мест. Сотрудник университета, заметивший свободные места на
                парковке и рассчитавший период нахождения своего транспортного средства
                или транспортных средств на парковке, обращается к сервису с целью
                регистрации абонемента.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default GuestPage;
