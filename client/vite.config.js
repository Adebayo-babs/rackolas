import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Must match PORT in server/.env
const API_PORT = process.env.API_PORT || 3500;

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": `http://localhost:${API_PORT}`,
    },
  },
});
