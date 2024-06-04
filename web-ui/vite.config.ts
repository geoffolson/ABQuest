import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["common"],
  },
  build: {
    commonjsOptions: {
      include: [/common/, /node_modules/],
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api/": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
