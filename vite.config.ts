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
});
