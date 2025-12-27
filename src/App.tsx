import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import About from "./pages/About";
import Index from "./pages/Index";
import Post from "./pages/Post";
import Library from "./pages/Library";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Get base path from Vite's BASE_URL
// In development, this will be "/"
// In production, this will match the base path set in vite.config.ts
const basePath = import.meta.env.BASE_URL || "/";

// Component to handle GitHub Pages 404.html redirect
function RedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a redirect query parameter (from 404.html)
    const queryParams = new URLSearchParams(location.search);
    const redirectPath = queryParams.get("/");
    
    if (redirectPath) {
      // Replace ~and~ with & in the path
      const decodedPath = redirectPath.replace(/~and~/g, "&");
      // Remove the query parameter and navigate to the actual path
      navigate(decodedPath, { replace: true });
    }
  }, [location, navigate]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={basePath}>
        <RedirectHandler />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/blogs" element={<Index />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/library" element={<Library />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
