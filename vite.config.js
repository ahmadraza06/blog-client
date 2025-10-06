import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.5), transparent 70%)",
      },
    },
  },
  plugins: [react(),
    tailwindcss(),
  ],
})
