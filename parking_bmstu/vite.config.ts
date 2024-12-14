import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {api_proxy_addr, dest_root} from "./target_config"

export default defineConfig({
  plugins: [
    react(),
  ],
  base: dest_root, 
  server: {
    host: '0.0.0.0',  
    proxy: {
      "/parkings": {
        target: api_proxy_addr,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },
    },
    
  },
});