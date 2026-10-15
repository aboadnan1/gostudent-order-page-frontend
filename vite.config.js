import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Use relative paths for generated assets.
  base: "./",

  build: {
    // Place production files inside the WordPress plugin.
    outDir: "../wordpress-plugin/assets/build",

    // Allow Vite to clean the dedicated build directory.
    emptyOutDir: true,

    rollupOptions: {
      output: {
        // Predictable filenames for WordPress integration.
        entryFileNames: "app.js",

        chunkFileNames: "assets/[name].js",

        // Keep the main stylesheet name predictable.
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "app.css";
          }

          return "assets/[name][extname]";
        },
      },
    },
  },
});
