import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Use environment variable if provided, otherwise use mode-based default
  // For custom domain (sriramkumar.in), use "/"
  // For GitHub Pages subpath, use "/personal-blog-website/"
  const basePath = process.env.VITE_BASE_PATH || (mode === "development" ? "/" : "/");
  
  return {
    // Base path
    // Dev: localhost -> "/"
    // Prod (custom domain): sriramkumar.in -> "/"
    // Prod (GitHub Pages): username.github.io/repo -> "/repo/"
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
//