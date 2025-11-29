import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import {
  SESSION_CONFIG,
  isSessionExpired,
  shouldShowExpiryWarning,
  getDaysUntilExpiry,
} from "@/config/sessionConfig";

/**
 * SessionManager Component
 * Monitors session expiry and auto-logs out users after inactivity
 */
const SessionManager = () => {
  const { isAuthenticated, logout } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if session has expired
  const checkSessionExpiry = () => {
    if (!isAuthenticated) return;

    const lastLoginTime = localStorage.getItem("lastLoginTime");
    if (!lastLoginTime) {
      logout();
      navigate("/login");
      return;
    }

    if (isSessionExpired()) {
      // Session expired
      logout();
      alert(SESSION_CONFIG.EXPIRY_MESSAGE(SESSION_CONFIG.EXPIRY_DAYS));
      navigate("/login");
    } else if (shouldShowExpiryWarning()) {
      // Show warning if session is about to expire
      const daysLeft = Math.ceil(getDaysUntilExpiry());
      console.warn(SESSION_CONFIG.WARNING_MESSAGE(daysLeft));
    }
  };

  // Check session expiry on mount and when location changes
  useEffect(() => {
    checkSessionExpiry();
  }, [location.pathname]);

  // Check session expiry at configured interval
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      checkSessionExpiry();
    }, SESSION_CONFIG.CHECK_INTERVAL_MINUTES * 60 * 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Update last activity time on user interaction
  useEffect(() => {
    if (!isAuthenticated) return;

    const updateLastActivity = () => {
      const lastLoginTime = localStorage.getItem("lastLoginTime");
      if (lastLoginTime) {
        // Update last activity timestamp
        localStorage.setItem(
          "lastActivityTime",
          new Date().getTime().toString()
        );
      }
    };

    // Track user activity
    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((event) => {
      window.addEventListener(event, updateLastActivity);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, updateLastActivity);
      });
    };
  }, [isAuthenticated]);

  return null; // This component doesn't render anything
};

export default SessionManager;
