import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";
import Navbar from "./Navbar";
import AuthNavbar from "./AuthNavbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, loading } = useAppContext();
  const [showAuthNavbar, setShowAuthNavbar] = useState(false);

  // Routes that should always use the public navbar (even if authenticated)
  const publicOnlyRoutes = ["/", "/login", "/profile/create"];

  // Check if current route is public only
  const isPublicOnlyRoute = publicOnlyRoutes.some(
    (route) => location.pathname === route
  );

  // Update navbar display based on authentication and route
  useEffect(() => {
    // If user is authenticated and not on a public-only route, show auth navbar
    if (isAuthenticated && !isPublicOnlyRoute) {
      setShowAuthNavbar(true);
    } else {
      setShowAuthNavbar(false);
    }
  }, [location.pathname, isAuthenticated, isPublicOnlyRoute]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {showAuthNavbar ? <AuthNavbar /> : <Navbar />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
