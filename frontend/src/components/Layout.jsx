import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import AuthNavbar from "./AuthNavbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Routes that should always use the authenticated navbar
  const authRoutes = [
    "/dashboard",
    "/profile",
    "/matches",
    "/settings",
    "/notifications",
  ];

  // Routes that should always use the public navbar
  const publicRoutes = ["/login", "/profile/create"];

  // Check if current route is an auth route
  const isAuthRoute = authRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  // Check if current route is a public route
  const isPublicRoute = publicRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  // Update authentication state when visiting auth routes
  useEffect(() => {
    if (isAuthRoute) {
      setIsAuthenticated(true);
      // Store in sessionStorage to persist during navigation
      sessionStorage.setItem("isAuthenticated", "true");
    } else if (isPublicRoute) {
      setIsAuthenticated(false);
      sessionStorage.removeItem("isAuthenticated");
    } else {
      // For other routes (pricing, contact), check sessionStorage
      const storedAuth = sessionStorage.getItem("isAuthenticated");
      setIsAuthenticated(storedAuth === "true");
    }
  }, [location.pathname, isAuthRoute, isPublicRoute]);

  // Show AuthNavbar if authenticated or on auth routes
  const showAuthNavbar = isAuthenticated || isAuthRoute;

  return (
    <div className="flex flex-col min-h-screen">
      {showAuthNavbar && !isPublicRoute ? <AuthNavbar /> : <Navbar />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
