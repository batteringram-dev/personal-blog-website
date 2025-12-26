import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // GitHub Pages base path
  // Dev: localhost
  // Prod: https://batteringram-dev.github.io/mywebsite/
  base: mode === "development" ? "/" : "/personal-blog-website/",

  build: {
    outDir: "docs", // GitHub Pages serves from /docs
  },

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
