import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/Parking_bmstu_frontend",
  server: {
    host: '0.0.0.0',
    proxy: {
      '/parkings': 'http://localhost:8000', // Прокси для запросов на '/parkings'
    }
    
  }
});
