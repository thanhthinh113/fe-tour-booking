import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 5173, // hoặc số cổng bạn muốn, ví dụ 5175
    strictPort: true,
  },
});
