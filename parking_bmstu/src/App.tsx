import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import ParkingPage from './pages/ParkingPage/ParkingPage';
import { CARDS_DATA } from './modules/mock';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/parking/:id"
          element={<ParkingPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
