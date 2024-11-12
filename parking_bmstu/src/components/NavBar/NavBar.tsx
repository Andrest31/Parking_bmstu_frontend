// components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/about">О нас</Link>
        </li>
        <li>
          <Link to="/">Парковки</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
