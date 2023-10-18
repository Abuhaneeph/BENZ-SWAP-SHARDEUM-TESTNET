import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),

        Peer: resolve(__dirname, 'pages/Peer/index.html'),
        Faucet: resolve(__dirname, 'pages/Faucet/index.html'),
        Liquidity: resolve(__dirname, 'pages/Liquidity/index.html'),
        Pool: resolve(__dirname, 'pages/Pools/index.html'),
        Swap: resolve(__dirname, 'pages/Swap/index.html'),
      },
    },
  },



})


