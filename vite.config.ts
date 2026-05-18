import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
   ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return;
          }

          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/react-router-dom/')) {
            return 'react';
          }

          if (id.includes('/@ant-design/icons/')) {
            return 'antd-icons';
          }

          if (id.includes('/antd/')) {
            return 'antd';
          }

          if (id.includes('/rc-') || id.includes('/@rc-component/')) {
            return 'antd-vendor';
          }

          if (id.includes('/@tanstack/react-query/') || id.includes('/@reduxjs/toolkit/') || id.includes('/react-redux/')) {
            return 'query';
          }

          if (id.includes('/framer-motion/') || id.includes('/motion/')) {
            return 'motion';
          }

          return 'vendor';
        },
      },
    },
  },
})
