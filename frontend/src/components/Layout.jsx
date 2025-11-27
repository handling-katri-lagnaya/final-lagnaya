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

  // Routes that should always use the authenticated navbar
  const authRoutes = [
    "/dashboard",
    "/admin",
    "/profile",
    "/matches",
    "/settings",
    "/notifications",
  ];

  // Routes that should always use the public navbar (including home page)
  const publicRoutes = [
    "/",
    "/login",
    "/profile/create",
    "/process",
    "/pricing",
    "/contact",
  ];

  // Check if current route is an auth route
  const isAuthRoute = authRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  // Check if current route is a public route
  const isPublicRoute = publicRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  // Update navbar display based on authentication and route
  useEffect(() => {
    if (isAuthRoute && isAuthenticated) {
      setShowAuthNavbar(true);
    } else if (isPublicRoute) {
      setShowAuthNavbar(false);
    } else {
      setShowAuthNavbar(isAuthenticated);
    }
  }, [location.pathname, isAuthRoute, isPublicRoute, isAuthenticated]);

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
      {showAuthNavbar && !isPublicRoute ? <AuthNavbar /> : <Navbar />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
