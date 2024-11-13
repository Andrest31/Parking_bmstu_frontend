import React from 'react';
import { Container } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-light text-center py-4">
      <Container>
        <h2>Остались вопросы?</h2>
        <p>+79999686720</p>
        <p><a href="mailto:andrestvlad@gmail.com">andrestvlad@gmail.com</a></p>
      </Container>
    </footer>
  );
};

export default Footer;
