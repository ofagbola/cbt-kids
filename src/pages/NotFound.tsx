import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <SEO title="Page Not Found | CBT Tools for Kids" description="Oops! That page is missing. Head back to the home page." canonicalPath={location.pathname} />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-4">Oops! Page not found</p>
        <Button asChild variant="hero">
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </main>
  );
};

export default NotFound;
