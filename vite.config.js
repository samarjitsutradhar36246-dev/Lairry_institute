import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
     tailwindcss() ,
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler'] ],
      },
    }),
  ],
    server: {
    host: true,    // optional: allows LAN access
    port: 3000,    // change this to your desired port
  },
})
