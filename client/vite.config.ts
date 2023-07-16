import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],

  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') }
    ]
  },

  server: {
    port: 7001,
    proxy: {
      '/api': {
        target: 'http://localhost:7003',
        changeOrigin: true,
      },
    }
  },

  build: {
    outDir: 'build',
  },
})
