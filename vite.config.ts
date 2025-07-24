import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    // 불러오기 설정 추가
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    allowedHosts: true, // ngrok 허용
  },
});
