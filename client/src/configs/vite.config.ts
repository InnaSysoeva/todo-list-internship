import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
    "@": path.resolve(__dirname, "src"),
    "@components": path.resolve(__dirname, 'src/main/components'),
    "@services": path.resolve(__dirname, 'src/services'),
    "@constants": path.resolve(__dirname, 'src/main/constants'),
    "@hooks": path.resolve(__dirname, 'src/main/hooks'),
    "@models": path.resolve(__dirname, 'src/main/models'),
    "@layouts": path.resolve(__dirname, 'src/main/layouts'),
    "@enums": path.resolve(__dirname, 'src/main/enums'),
    "@api": path.resolve(__dirname, 'src/main/api'),
    "@styles": path.resolve(__dirname, 'src/styles'),
    "@utils": path.resolve(__dirname, 'src/utils'),
  }},
  server: {
    port: 8000,
    strictPort: true, 
    host: true
  },
});
