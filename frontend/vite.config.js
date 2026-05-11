import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
     host: true,
    port: 5137,      // Matches your current Dev Tunnel port
    strictPort: true, // Prevents Vite from switching to 5138 if 5137 is busy
    allowedHosts: [
      '0p7c3536-5137.uks1.devtunnels.ms', // Your specific Dev Tunnel link
      '.devtunnels.ms'                    // Allows any devtunnel sub-link
    ],
    // Optional: This allows you to use fetch('/api/...') instead of full URLs
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})