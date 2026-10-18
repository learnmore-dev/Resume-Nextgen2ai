import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3003,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8093',
        changeOrigin: true,
      }
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 3003,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-icons': ['lucide-react'],
          'vendor-api': ['axios'],
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
