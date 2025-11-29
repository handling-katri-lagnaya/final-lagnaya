import { createContext, useContext, useState, useEffect } from "react";
import { dataStore } from "@/data/staticData";
import { notificationSystem } from "@/utils/notificationSystem";
import { workflowManager } from "@/utils/workflowManager";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Session expiry configuration (in days)
  const SESSION_EXPIRY_DAYS = 7; // User will be logged out after 7 days of inactivity

  // Check if session has expired
  const isSessionExpired = () => {
    const lastLoginTime = localStorage.getItem("lastLoginTime");
    if (!lastLoginTime) return true;

    const now = new Date().getTime();
    const lastLogin = parseInt(lastLoginTime);
    const daysSinceLogin = (now - lastLogin) / (1000 * 60 * 60 * 24);

    return daysSinceLogin > SESSION_EXPIRY_DAYS;
  };

  // Initialize authentication state from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    const savedAuth = localStorage.getItem("isAuthenticated");

    if (savedUser && savedAuth === "true") {
      // Check if session has expired
      if (isSessionExpired()) {
        // Session expired - clear everything
        localStorage.removeItem("currentUser");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("lastLoginTime");
        setCurrentUser(null);
        setIsAuthenticated(false);
      } else {
        // Session still valid
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password) => {
    const result = dataStore.authenticate(email, password);
    if (result.success) {
      setCurrentUser(result.user);
      setIsAuthenticated(true);

      // Store user data and login timestamp
      localStorage.setItem("currentUser", JSON.stringify(result.user));
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("lastLoginTime", new Date().getTime().toString());

      // Log activity
      dataStore.addActivity({
        adminName: result.user.name,
        action: "User Login",
        target: result.user.email,
        type: "authentication",
        details: `User logged in successfully`,
      });

      return { success: true, user: result.user };
    }
    return result;
  };

  // Logout function
  const logout = () => {
    if (currentUser) {
      dataStore.addActivity({
        adminName: currentUser.name,
        action: "User Logout",
        target: currentUser.email,
        type: "authentication",
        details: `User logged out`,
      });
    }

    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("lastLoginTime");
  };

  // Register function
  const register = (userData) => {
    try {
      const newUser = dataStore.createUser(userData);

      // Log activity
      dataStore.addActivity({
        adminName: "System",
        action: "User Registration",
        target: newUser.email,
        type: "user_management",
        details: `New user registered: ${newUser.name}`,
      });

      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Create profile function
  const createProfile = (profileData) => {
    try {
      const newProfile = dataStore.createProfile({
        ...profileData,
        userId: currentUser.id,
      });

      // Update user's profile completion
      dataStore.updateUser(currentUser.id, {
        profileComplete: 80,
        profileId: newProfile.id,
      });

      // Log activity
      dataStore.addActivity({
        adminName: currentUser.name,
        action: "Profile Created",
        target: `${profileData.personalDetails.firstName} ${profileData.personalDetails.lastName}`,
        type: "profile_management",
        details: `New profile created and submitted for verification`,
      });

      return { success: true, profile: newProfile };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Update profile function
  const updateProfile = (profileId, updates) => {
    try {
      const updatedProfile = dataStore.updateProfile(profileId, updates);

      // Log activity
      dataStore.addActivity({
        adminName: currentUser?.name || "System",
        action: "Profile Updated",
        target: `Profile ID: ${profileId}`,
        type: "profile_management",
        details: `Profile information updated`,
      });

      return { success: true, profile: updatedProfile };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Verify profile function (admin only) - uses workflow manager
  const verifyProfile = async (profileId, status, notes) => {
    if (!currentUser || currentUser.role !== "admin") {
      return { success: false, message: "Unauthorized" };
    }

    try {
      const result = await workflowManager.verifyProfile(
        currentUser.name,
        profileId,
        status,
        notes
      );
      return result;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Send match suggestion function (admin only) - now calculates real Guna matching
  const sendMatchSuggestion = async (profile1Id, profile2Id) => {
    if (!currentUser || currentUser.role !== "admin") {
      return { success: false, message: "Unauthorized" };
    }

    try {
      const profile1 = dataStore.getProfileById(profile1Id);
      const profile2 = dataStore.getProfileById(profile2Id);

      if (!profile1 || !profile2) {
        return { success: false, message: "Profiles not found" };
      }

      // Calculate real Guna matching using the proper formula: matched gunas / 36
      const { calculateGunaMatching } = await import("@/utils/gunaMatching");
      const matchResult = calculateGunaMatching(profile1, profile2);

      const newMatch = dataStore.createMatch({
        profile1Id,
        profile2Id,
        compatibility: matchResult.compatibilityPercentage,
        gunaScore: matchResult.gunaScore,
        matchedBy: currentUser.name,
        matchDetails: {
          totalMatchedGunas: matchResult.totalMatchedGunas,
          compatibilityLevel: matchResult.compatibilityLevel,
          recommendation: matchResult.recommendation,
        },
      });

      // Log activity
      dataStore.addActivity({
        adminName: currentUser.name,
        action: "Match Suggestion Sent",
        target: `${profile1.personalDetails.firstName} & ${profile2.personalDetails.firstName}`,
        type: "matching",
        details: `Compatibility: ${matchResult.compatibilityPercentage}%, Guna Score: ${matchResult.gunaScore} (${matchResult.totalMatchedGunas}/36 gunas matched)`,
      });

      return { success: true, match: newMatch, matchResult };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Update meetup status function (admin only)
  const updateMeetupStatus = (meetupId, status, notes) => {
    if (!currentUser || currentUser.role !== "admin") {
      return { success: false, message: "Unauthorized" };
    }

    try {
      const updatedMeetup = dataStore.updateMeetup(meetupId, {
        status,
        adminNotes: notes,
      });

      // Log activity
      dataStore.addActivity({
        adminName: currentUser.name,
        action: `Meetup ${status.charAt(0).toUpperCase() + status.slice(1)}`,
        target: `Meetup ID: ${meetupId}`,
        type: "meetup",
        details: notes || `Meetup status updated to ${status}`,
      });

      return { success: true, meetup: updatedMeetup };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Reply to feedback function (admin only)
  const replyToFeedback = (feedbackId, reply) => {
    if (!currentUser || currentUser.role !== "admin") {
      return { success: false, message: "Unauthorized" };
    }

    try {
      const updatedFeedback = dataStore.updateFeedback(feedbackId, {
        adminReply: reply,
        status: "resolved",
      });

      // Log activity
      dataStore.addActivity({
        adminName: currentUser.name,
        action: "Feedback Replied",
        target: `Feedback ID: ${feedbackId}`,
        type: "feedback",
        details: "Admin replied to customer feedback",
      });

      return { success: true, feedback: updatedFeedback };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Get statistics function
  const getStatistics = () => {
    return dataStore.getStatistics();
  };

  // Workflow functions
  const expressInterest = async (matchId) => {
    if (!currentUser) return { success: false, message: "Not authenticated" };
    return await workflowManager.expressInterest(currentUser.id, matchId);
  };

  const requestMeeting = async (matchId, meetingDetails) => {
    if (!currentUser) return { success: false, message: "Not authenticated" };
    return await workflowManager.requestFamilyMeeting(
      currentUser.id,
      matchId,
      meetingDetails
    );
  };

  const scheduleMeeting = async (meetupId, meetingDetails, notes) => {
    if (!currentUser || currentUser.role !== "admin") {
      return { success: false, message: "Unauthorized" };
    }
    return await workflowManager.scheduleMeeting(
      currentUser.name,
      meetupId,
      meetingDetails,
      notes
    );
  };

  const completeMeeting = async (meetupId, outcome) => {
    if (!currentUser || currentUser.role !== "admin") {
      return { success: false, message: "Unauthorized" };
    }
    return await workflowManager.completeMeeting(
      currentUser.name,
      meetupId,
      outcome
    );
  };

  const processPayment = async (paymentData) => {
    if (!currentUser) return { success: false, message: "Not authenticated" };
    return await workflowManager.processPayment(currentUser.id, paymentData);
  };

  // Notification functions
  const getNotifications = () => {
    if (!currentUser) return [];
    return notificationSystem.getUserNotifications(currentUser.id);
  };

  const getUnreadCount = () => {
    if (!currentUser) return 0;
    return notificationSystem.getUnreadCount(currentUser.id);
  };

  const markNotificationRead = (notificationId) => {
    notificationSystem.markAsRead(notificationId);
  };

  const getUserJourney = () => {
    if (!currentUser) return null;
    return workflowManager.getUserJourneyStatus(currentUser.id);
  };

  const value = {
    // State
    currentUser,
    isAuthenticated,
    loading,

    // Auth functions
    login,
    logout,
    register,

    // Profile functions
    createProfile,
    updateProfile,
    verifyProfile,

    // Admin functions
    sendMatchSuggestion,
    updateMeetupStatus,
    replyToFeedback,

    // Workflow functions
    expressInterest,
    requestMeeting,
    scheduleMeeting,
    completeMeeting,
    processPayment,

    // Notification functions
    getNotifications,
    getUnreadCount,
    markNotificationRead,
    getUserJourney,

    // Data functions
    getStatistics,

    // Direct data access
    dataStore,
    notificationSystem,
    workflowManager,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
