import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log 404 error for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_not_found', {
        page_path: location.pathname
      });
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <div className="text-8xl mb-8">🍛</div>
            <h1 className="font-display font-bold text-6xl sm:text-7xl mb-6">
              <span className="bg-gradient-spice bg-clip-text text-transparent">404</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Recipe Not Found!</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like this page went missing from our kitchen. Let's get you back to cooking!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="hero" size="lg">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Button>
              </Link>
              <Button variant="glass" size="lg" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
