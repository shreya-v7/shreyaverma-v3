import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiProxy = (env.VITE_SPOTIFY_API_PROXY_TARGET || 'http://127.0.0.1:8888').replace(/\/$/, '');

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: apiProxy,
          changeOrigin: true,
          secure: apiProxy.startsWith('https://'),
        },
      },
    },
    build: {
      outDir: 'dist',
    },
  };
});
