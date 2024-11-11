import React from 'react';
import './Footer.css'; // Добавьте стили для компонента

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <h2>Остались вопросы?</h2>
      <p>+79999686720</p>
      <p><a href="mailto:andrestvlad@gmail.com">andrestvlad@gmail.com</a></p>
    </footer>
  );
};

export default Footer;
