import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import ParkingPage from './pages/ParkingPage/ParkingPage';
import GuestPage from './pages/GuestPage/GuestPage';
import {dest_root} from "../target_config"


const App: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).__TAURI__?.tauri) {
      const { invoke } = (window as any).__TAURI__.tauri;
      
      invoke('tauri', { cmd: 'create' })
        .then((response: any) => console.log(response))
        .catch((error: any) => console.log(error));

      return () => {
        invoke('tauri', { cmd: 'close' })
          .then((response: any) => console.log(response))
          .catch((error: any) => console.log(error));
      };
    }
  }, []);

  return (
    <Router basename={dest_root}>
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
