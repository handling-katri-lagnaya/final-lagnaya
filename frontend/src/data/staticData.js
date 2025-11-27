// Static data store for the application
// This simulates a backend database with localStorage persistence

class StaticDataStore {
  constructor() {
    this.initializeData();
  }

  // Initialize data from localStorage or create default data
  initializeData() {
    const savedData = localStorage.getItem("khatriLagnayaData");
    if (savedData) {
      const data = JSON.parse(savedData);
      this.users = data.users || [];
      this.profiles = data.profiles || [];
      this.matches = data.matches || [];
      this.payments = data.payments || [];
      this.meetups = data.meetups || [];
      this.feedback = data.feedback || [];
      this.activities = data.activities || [];
      this.settings = data.settings || {};
    } else {
      this.createDefaultData();
    }
  }

  // Save data to localStorage
  saveData() {
    const data = {
      users: this.users,
      profiles: this.profiles,
      matches: this.matches,
      payments: this.payments,
      meetups: this.meetups,
      feedback: this.feedback,
      activities: this.activities,
      settings: this.settings,
    };
    localStorage.setItem("khatriLagnayaData", JSON.stringify(data));
  }

  // Create default data
  createDefaultData() {
    this.users = [
      {
        id: 1,
        name: "Priya Sharma",
        email: "priya.sharma@email.com",
        phone: "+91 98765 43210",
        password: "password123",
        status: "active",
        verified: true,
        joinDate: "2024-01-15",
        lastActive: "2024-01-20",
        profileComplete: 95,
        matches: 12,
        role: "user",
        profileId: 1,
      },
      {
        id: 2,
        name: "Rahul Gupta",
        email: "rahul.gupta@email.com",
        phone: "+91 87654 32109",
        password: "password123",
        status: "pending",
        verified: false,
        joinDate: "2024-01-18",
        lastActive: "2024-01-19",
        profileComplete: 60,
        matches: 0,
        role: "user",
        profileId: 2,
      },
      {
        id: 3,
        name: "Admin User",
        email: "admin@khatrilagnaya.com",
        phone: "+91 99999 99999",
        password: "admin123",
        status: "active",
        verified: true,
        joinDate: "2024-01-01",
        lastActive: "2024-01-21",
        profileComplete: 100,
        matches: 0,
        role: "admin",
        profileId: null,
      },
    ];

    this.profiles = [
      {
        id: 1,
        userId: 1,
        personalDetails: {
          firstName: "Priya",
          lastName: "Sharma",
          age: 26,
          dateOfBirth: "1998-03-15",
          birthTime: "10:30",
          height: "5-4",
          address: "Mumbai, Maharashtra",
          phone: "+91 98765 43210",
          education: "MBA Finance",
          employment: "Financial Analyst",
        },
        familyDetails: {
          fatherName: "Rajesh Sharma",
          motherName: "Sunita Sharma",
          gotra: "Bharadwaj",
        },
        astrologyDetails: {
          janmanamam: "Priyanka",
          rashi: "Kanya",
          nakshatram: "Hasta",
          paadam: "2",
        },
        profilePhoto: null,
        status: "active",
        verificationStatus: "verified",
        createdDate: "2024-01-15",
        verifiedDate: "2024-01-16",
      },
      {
        id: 2,
        userId: 2,
        personalDetails: {
          firstName: "Rahul",
          lastName: "Gupta",
          age: 29,
          dateOfBirth: "1995-07-22",
          birthTime: "14:15",
          height: "5-10",
          address: "Delhi, NCR",
          phone: "+91 87654 32109",
          education: "B.Tech Computer Science",
          employment: "Software Engineer",
        },
        familyDetails: {
          fatherName: "Suresh Gupta",
          motherName: "Meera Gupta",
          gotra: "Kashyap",
        },
        astrologyDetails: {
          janmanamam: "Rahul",
          rashi: "Simha",
          nakshatram: "Magha",
          paadam: "1",
        },
        profilePhoto: null,
        status: "pending",
        verificationStatus: "pending",
        createdDate: "2024-01-18",
        verifiedDate: null,
      },
    ];

    this.matches = [
      {
        id: 1,
        profile1Id: 1,
        profile2Id: 2,
        compatibility: 85,
        gunaScore: "28/36",
        status: "suggested",
        createdDate: "2024-01-20",
        matchedBy: "admin",
        notes: "Excellent compatibility based on guna matching",
      },
    ];

    this.payments = [
      {
        id: 1,
        userId: 1,
        amount: 15000,
        type: "Success Fee",
        status: "completed",
        paymentMethod: "UPI",
        transactionId: "TXN123456789",
        date: "2024-01-20",
        description: "Marriage finalized - Priya & Rahul",
      },
    ];

    this.meetups = [
      {
        id: 1,
        profile1Id: 1,
        profile2Id: 2,
        requestDate: "2024-01-20",
        status: "pending",
        priority: "high",
        proposedMeeting: {
          date: "2024-01-25",
          time: "11:00 AM",
          venue: "Hotel Taj, Mumbai",
          type: "Family Introduction",
        },
        notes:
          "Both families are very interested. Priya's family prefers weekend meeting.",
        adminNotes: "",
      },
    ];

    this.feedback = [
      {
        id: 1,
        userId: 1,
        type: "positive",
        rating: 5,
        category: "Service Quality",
        subject: "Excellent matchmaking service!",
        message:
          "I am extremely happy with the service provided by Khatri Lagnaya. The team was very professional and found me a perfect match.",
        date: "2024-01-20",
        status: "new",
        adminReply: null,
        tags: ["service", "matching", "professional"],
      },
    ];

    this.activities = [
      {
        id: 1,
        adminName: "Admin User",
        action: "Profile Verified",
        target: "Priya Sharma",
        type: "verification",
        timestamp: "2024-01-20 14:30:25",
        details: "Profile verification completed successfully",
        ipAddress: "192.168.1.100",
      },
    ];

    this.settings = {
      siteName: "Khatri Lagnaya",
      adminEmail: "admin@khatrilagnaya.com",
      maxFreeMatches: 2,
      successFeeAmount: 15000,
    };

    this.saveData();
  }

  // User management methods
  getUsers() {
    return this.users;
  }

  getUserById(id) {
    return this.users.find((user) => user.id === id);
  }

  getUserByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  createUser(userData) {
    const newUser = {
      id: Math.max(...this.users.map((u) => u.id), 0) + 1,
      ...userData,
      joinDate: new Date().toISOString().split("T")[0],
      lastActive: new Date().toISOString().split("T")[0],
      matches: 0,
      role: userData.role || "user",
    };
    this.users.push(newUser);
    this.saveData();
    return newUser;
  }

  updateUser(id, updates) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updates };
      this.saveData();
      return this.users[userIndex];
    }
    return null;
  }

  // Profile management methods
  getProfiles() {
    return this.profiles;
  }

  getProfileById(id) {
    return this.profiles.find((profile) => profile.id === id);
  }

  getProfileByUserId(userId) {
    return this.profiles.find((profile) => profile.userId === userId);
  }

  createProfile(profileData) {
    const newProfile = {
      id: Math.max(...this.profiles.map((p) => p.id), 0) + 1,
      ...profileData,
      status: "pending",
      verificationStatus: "pending",
      createdDate: new Date().toISOString().split("T")[0],
      verifiedDate: null,
    };
    this.profiles.push(newProfile);
    this.saveData();
    return newProfile;
  }

  updateProfile(id, updates) {
    const profileIndex = this.profiles.findIndex(
      (profile) => profile.id === id
    );
    if (profileIndex !== -1) {
      this.profiles[profileIndex] = {
        ...this.profiles[profileIndex],
        ...updates,
      };
      this.saveData();
      return this.profiles[profileIndex];
    }
    return null;
  }

  // Match management methods
  getMatches() {
    return this.matches;
  }

  createMatch(matchData) {
    const newMatch = {
      id: Math.max(...this.matches.map((m) => m.id), 0) + 1,
      ...matchData,
      createdDate: new Date().toISOString().split("T")[0],
      status: "suggested",
    };
    this.matches.push(newMatch);
    this.saveData();
    return newMatch;
  }

  // Payment management methods
  getPayments() {
    return this.payments;
  }

  createPayment(paymentData) {
    const newPayment = {
      id: Math.max(...this.payments.map((p) => p.id), 0) + 1,
      ...paymentData,
      date: new Date().toISOString().split("T")[0],
    };
    this.payments.push(newPayment);
    this.saveData();
    return newPayment;
  }

  // Meetup management methods
  getMeetups() {
    return this.meetups;
  }

  updateMeetup(id, updates) {
    const meetupIndex = this.meetups.findIndex((meetup) => meetup.id === id);
    if (meetupIndex !== -1) {
      this.meetups[meetupIndex] = { ...this.meetups[meetupIndex], ...updates };
      this.saveData();
      return this.meetups[meetupIndex];
    }
    return null;
  }

  // Feedback management methods
  getFeedback() {
    return this.feedback;
  }

  updateFeedback(id, updates) {
    const feedbackIndex = this.feedback.findIndex(
      (feedback) => feedback.id === id
    );
    if (feedbackIndex !== -1) {
      this.feedback[feedbackIndex] = {
        ...this.feedback[feedbackIndex],
        ...updates,
      };
      this.saveData();
      return this.feedback[feedbackIndex];
    }
    return null;
  }

  // Activity log methods
  getActivities() {
    return this.activities;
  }

  addActivity(activityData) {
    const newActivity = {
      id: Math.max(...this.activities.map((a) => a.id), 0) + 1,
      ...activityData,
      timestamp: new Date().toISOString().replace("T", " ").split(".")[0],
      ipAddress: "192.168.1.100", // Mock IP
    };
    this.activities.unshift(newActivity); // Add to beginning
    // Keep only last 100 activities
    if (this.activities.length > 100) {
      this.activities = this.activities.slice(0, 100);
    }
    this.saveData();
    return newActivity;
  }

  // Authentication methods
  authenticate(email, password) {
    const user = this.getUserByEmail(email);
    if (user && user.password === password) {
      // Update last active
      this.updateUser(user.id, {
        lastActive: new Date().toISOString().split("T")[0],
      });
      return { success: true, user: { ...user, password: undefined } };
    }
    return { success: false, message: "Invalid credentials" };
  }

  // Statistics methods
  getStatistics() {
    return {
      totalUsers: this.users.filter((u) => u.role === "user").length,
      activeProfiles: this.profiles.filter((p) => p.status === "active").length,
      pendingVerifications: this.profiles.filter(
        (p) => p.verificationStatus === "pending"
      ).length,
      matchesMade: this.matches.length,
      totalRevenue: this.payments
        .filter((p) => p.status === "completed")
        .reduce((sum, p) => sum + p.amount, 0),
      pendingMeetups: this.meetups.filter((m) => m.status === "pending").length,
      newFeedback: this.feedback.filter((f) => f.status === "new").length,
    };
  }
}

// Create and export singleton instance
export const dataStore = new StaticDataStore();

// Export individual methods for easier importing
export const {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  getProfiles,
  getProfileById,
  getProfileByUserId,
  createProfile,
  updateProfile,
  getMatches,
  createMatch,
  getPayments,
  createPayment,
  getMeetups,
  updateMeetup,
  getFeedback,
  updateFeedback,
  getActivities,
  addActivity,
  authenticate,
  getStatistics,
} = dataStore;
