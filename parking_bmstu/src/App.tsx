import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import ParkingPage from './pages/ParkingPage/ParkingPage';
import GuestPage from './pages/GuestPage/GuestPage';

const App: React.FC = () => {
  return (
    <Router basename="/Parking_bmstu_frontend">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<GuestPage />} />
        <Route
          path="/parking/:id"
          element={<ParkingPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
