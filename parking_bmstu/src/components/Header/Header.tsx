import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="brand-link">
          <h1>1830</h1>
        </Link>
      </div>
      <div className="header-center">
        <Navbar expand="lg" className="navbar">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto nav-links">
              <Nav.Link as={Link} to="/cart" className="nav-link">Корзина</Nav.Link>
              <Nav.Link as={Link} to="/login" className="nav-link">Заявки</Nav.Link>
                <Nav.Link as={Link} to="/" className="nav-link">Главная</Nav.Link>
                <Nav.Link as={Link} to="/about" className="nav-link">О нас</Nav.Link>
                <Nav.Link as={Link} to="/login" className="nav-link">Войти</Nav.Link>
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
