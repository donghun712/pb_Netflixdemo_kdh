import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "docs", // "빌드 결과를 dist 말고 docs 폴더에 넣어라" 라는 뜻
  },
})
