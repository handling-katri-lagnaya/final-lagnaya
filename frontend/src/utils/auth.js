// Authentication utility functions

export const AUTH_STORAGE_KEY = "isAuthenticated";

export const setAuthState = (isAuthenticated) => {
  if (isAuthenticated) {
    sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
  } else {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  }
};

export const getAuthState = () => {
  return sessionStorage.getItem(AUTH_STORAGE_KEY) === "true";
};

export const clearAuthState = () => {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
};

// Check if current path requires authentication
export const isAuthRoute = (pathname) => {
  const authRoutes = [
    "/dashboard",
    "/profile",
    "/matches",
    "/settings",
    "/notifications",
    "/favourites",
  ];
  return authRoutes.some((route) => pathname.startsWith(route));
};

// Check if current path is a public route
export const isPublicRoute = (pathname) => {
  const publicRoutes = [
    "/",
    "/login",
    "/profile/create",
    "/process",
    "/pricing",
    "/contact",
  ];
  return publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route)
  );
};

// Check if current path should always show public navbar
export const shouldShowPublicNavbar = (pathname) => {
  const alwaysPublicRoutes = [
    "/",
    "/process",
    "/pricing",
    "/contact",
    "/login",
    "/profile/create",
  ];
  return alwaysPublicRoutes.some((route) => pathname === route);
};
