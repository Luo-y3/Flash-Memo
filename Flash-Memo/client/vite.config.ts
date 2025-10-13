// client/vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    // 1. ⚙️ Client Dev Server Port 5000
    port: 5000,

    // 2. 🔗 Proxy for '/api' to Rust Server (Port 3000)
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Port Rust Server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

