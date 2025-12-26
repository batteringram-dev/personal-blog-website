import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Use environment variable if provided, otherwise use mode-based default
  const basePath = process.env.VITE_BASE_PATH || (mode === "development" ? "/" : "/personal-blog-website/");
  
  return {
    // GitHub Pages base path
    // Dev: localhost
    // Prod: https://batteringram-dev.github.io/personal-blog-website/
    base: basePath,

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
  };
});
