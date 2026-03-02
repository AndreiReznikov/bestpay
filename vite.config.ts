import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        payment: "payment.html",
        notify: "notify.html",
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
      "@ui": "/src/ui",
      "@components": "/src/components",
      "@assets": "/src/assets",
    },
  },
});
