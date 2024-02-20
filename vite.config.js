import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Specify the main entry point of your application
    rollupOptions: {
      input: '/src/main.jsx', // Adjust the path accordingly
    },
  },
  server: {
    // Configure the development server
    port: 3000, // Set your desired port
  },
});
