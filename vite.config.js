import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 👇 여기 본인 레포지토리 이름이 정확한지 꼭 확인하세요!
  // 앞뒤로 슬래시(/)가 반드시 있어야 합니다.
  base: "/pb_Netflixdemo_kdh/", 
  build: {
    outDir: "docs",
  },
})