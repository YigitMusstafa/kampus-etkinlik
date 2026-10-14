import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // CSS küçültücü --no: 2321032021'i 2321030000'e yuvarlıyor, mod 360 ile renk değişiyor
    cssMinify: false,
  },
})
