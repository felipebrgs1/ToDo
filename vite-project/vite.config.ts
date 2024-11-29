import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Redireciona todas as requisições que começam com /api para o backend
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // Opcional: reescreve o caminho removendo /api antes de enviar para o backend
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    // Porta em que o frontend vai rodar (padrão é 5173, mas você pode mudar)
    port: 5173
  },
  resolve: {
    // Define aliases para importações mais fáceis
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    // Configurações de build
    outDir: 'dist', // Diretório de saída da build
    assetsDir: 'assets', // Diretório para assets estáticos
    sourcemap: true, // Gera sourcemaps para debugging
  }
})