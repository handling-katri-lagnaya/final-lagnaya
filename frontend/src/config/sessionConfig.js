/**
 * Session Management Configuration
 *
 * Configure session expiry and auto-logout behavior
 */

export const SESSION_CONFIG = {
  // Session expiry time in days
  // User will be automatically logged out after this many days of inactivity
  EXPIRY_DAYS: 7,

  // Check session expiry interval in minutes
  // How often to check if session has expired
  CHECK_INTERVAL_MINUTES: 5,

  // Auto-logout on home page visit
  // If true, visiting home page will log out authenticated users
  LOGOUT_ON_HOME_VISIT: true,

  // Show expiry warning before logout (in days)
  // Show warning X days before session expires
  WARNING_DAYS_BEFORE_EXPIRY: 1,

  // Session expiry message
  EXPIRY_MESSAGE: (days) =>
    `Your session has expired after ${days} days of inactivity. Please login again.`,

  // Warning message
  WARNING_MESSAGE: (daysLeft) =>
    `Your session will expire in ${daysLeft} day(s). Please login again to continue.`,
};

/**
 * Calculate days since last login
 */
export const getDaysSinceLogin = () => {
  const lastLoginTime = localStorage.getItem("lastLoginTime");
  if (!lastLoginTime) return null;

  const now = new Date().getTime();
  const lastLogin = parseInt(lastLoginTime);
  return (now - lastLogin) / (1000 * 60 * 60 * 24);
};

/**
 * Check if session has expired
 */
export const isSessionExpired = () => {
  const daysSinceLogin = getDaysSinceLogin();
  if (daysSinceLogin === null) return true;
  return daysSinceLogin > SESSION_CONFIG.EXPIRY_DAYS;
};

/**
 * Get days until session expires
 */
export const getDaysUntilExpiry = () => {
  const daysSinceLogin = getDaysSinceLogin();
  if (daysSinceLogin === null) return 0;
  return Math.max(0, SESSION_CONFIG.EXPIRY_DAYS - daysSinceLogin);
};

/**
 * Check if session expiry warning should be shown
 */
export const shouldShowExpiryWarning = () => {
  const daysUntilExpiry = getDaysUntilExpiry();
  return (
    daysUntilExpiry > 0 &&
    daysUntilExpiry <= SESSION_CONFIG.WARNING_DAYS_BEFORE_EXPIRY
  );
};
