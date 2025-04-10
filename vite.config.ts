import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@tabler/icons-react', 'linked-dep'], // Ensure these are pre-bundled
  },
  build: {
    rollupOptions: {
      output: {
        // Group small chunks into larger ones
        manualChunks(id) {
          // Group all node_modules into a single chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          // Optionally, group your src files into logical chunks
          if (id.includes('src/components')) {
            return 'components';
          }
          if (id.includes('src/utils')) {
            return 'utils';
          }
          if (id.includes('@tabler/icons-react')) {
            return 'tabler-icons';
          }
        },
        // Set a minimum chunk size to avoid tiny chunks
      },
    },
  },
})
