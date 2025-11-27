import { createContext, useContext, useState, useEffect } from "react";
import { dataStore } from "@/data/staticData";

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

  // Initialize authentication state from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    const savedAuth = localStorage.getItem("isAuthenticated");

    if (savedUser && savedAuth === "true") {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password) => {
    const result = dataStore.authenticate(email, password);
    if (result.success) {
      setCurrentUser(result.user);
      setIsAuthenticated(true);
      localStorage.setItem("currentUser", JSON.stringify(result.user));
      localStorage.setItem("isAuthenticated", "true");

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

  // Verify profile function (admin only)
  const verifyProfile = (profileId, status, notes) => {
    if (!currentUser || currentUser.role !== "admin") {
      return { success: false, message: "Unauthorized" };
    }

    try {
      const updates = {
        verificationStatus: status,
        verifiedDate:
          status === "verified" ? new Date().toISOString().split("T")[0] : null,
        status: status === "verified" ? "active" : "pending",
        adminNotes: notes,
      };

      const updatedProfile = dataStore.updateProfile(profileId, updates);

      if (status === "verified") {
        // Update user status
        dataStore.updateUser(updatedProfile.userId, {
          status: "active",
          verified: true,
          profileComplete: 100,
        });
      }

      // Log activity
      dataStore.addActivity({
        adminName: currentUser.name,
        action: `Profile ${status === "verified" ? "Verified" : "Rejected"}`,
        target: `${updatedProfile.personalDetails.firstName} ${updatedProfile.personalDetails.lastName}`,
        type: "verification",
        details: notes || `Profile ${status}`,
      });

      return { success: true, profile: updatedProfile };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Send match suggestion function (admin only)
  const sendMatchSuggestion = (
    profile1Id,
    profile2Id,
    compatibility,
    gunaScore
  ) => {
    if (!currentUser || currentUser.role !== "admin") {
      return { success: false, message: "Unauthorized" };
    }

    try {
      const newMatch = dataStore.createMatch({
        profile1Id,
        profile2Id,
        compatibility,
        gunaScore,
        matchedBy: currentUser.name,
      });

      const profile1 = dataStore.getProfileById(profile1Id);
      const profile2 = dataStore.getProfileById(profile2Id);

      // Log activity
      dataStore.addActivity({
        adminName: currentUser.name,
        action: "Match Suggestion Sent",
        target: `${profile1.personalDetails.firstName} & ${profile2.personalDetails.firstName}`,
        type: "matching",
        details: `Compatibility: ${compatibility}%, Guna Score: ${gunaScore}`,
      });

      return { success: true, match: newMatch };
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

    // Data functions
    getStatistics,

    // Direct data access
    dataStore,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
