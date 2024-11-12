import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/parkings': 'http://localhost:8000', // Прокси для запросов на '/parkings'
    }
  }
});
