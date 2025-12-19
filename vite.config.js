import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  build: {
    chunkSizeWarningLimit: 1000, // Учкундардын өлчөмү боюнча эскертүү чегин 1000кбга чейин жогорулатуу
  }
});