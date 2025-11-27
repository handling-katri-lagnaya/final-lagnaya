// Sample data generator for testing the application
import { dataStore } from "@/data/staticData";

export const generateSampleData = () => {
  // Add more sample users
  const sampleUsers = [
    {
      name: "Anjali Agarwal",
      email: "anjali.agarwal@email.com",
      phone: "+91 76543 21098",
      password: "password123",
      status: "active",
      verified: true,
      profileComplete: 100,
      role: "user",
    },
    {
      name: "Vikram Singh",
      email: "vikram.singh@email.com",
      phone: "+91 65432 10987",
      password: "password123",
      status: "suspended",
      verified: true,
      profileComplete: 85,
      role: "user",
    },
    {
      name: "Meera Patel",
      email: "meera.patel@email.com",
      phone: "+91 54321 09876",
      password: "password123",
      status: "pending",
      verified: false,
      profileComplete: 70,
      role: "user",
    },
  ];

  // Add sample profiles
  const sampleProfiles = [
    {
      userId: 3, // Will be updated when user is created
      personalDetails: {
        firstName: "Anjali",
        lastName: "Agarwal",
        age: 24,
        dateOfBirth: "2000-05-10",
        birthTime: "08:30",
        height: "5-5",
        address: "Delhi, NCR",
        phone: "+91 76543 21098",
        education: "B.Tech Computer Science",
        employment: "Software Engineer",
      },
      familyDetails: {
        fatherName: "Rajesh Agarwal",
        motherName: "Sunita Agarwal",
        gotra: "Vasishtha",
      },
      astrologyDetails: {
        janmanamam: "Anjali",
        rashi: "Meena",
        nakshatram: "Revati",
        paadam: "3",
      },
      status: "active",
      verificationStatus: "verified",
    },
  ];

  // Add sample feedback
  const sampleFeedback = [
    {
      userId: 1,
      type: "suggestion",
      rating: 4,
      category: "Feature Request",
      subject: "Mobile app would be great",
      message:
        "The service is good but it would be much better if you had a mobile app.",
      status: "new",
      tags: ["mobile", "app", "suggestion"],
    },
    {
      userId: 2,
      type: "complaint",
      rating: 2,
      category: "Communication",
      subject: "Delayed response from team",
      message:
        "I submitted my profile 2 weeks ago but haven't received any match suggestions yet.",
      status: "new",
      tags: ["delay", "support", "communication"],
    },
  ];

  // Add sample payments
  const samplePayments = [
    {
      userId: 1,
      amount: 5000,
      type: "Premium Service",
      status: "completed",
      paymentMethod: "UPI",
      transactionId: "TXN987654321",
      description: "Premium matchmaking service",
    },
    {
      userId: 2,
      amount: 2500,
      type: "Consultation Fee",
      status: "pending",
      paymentMethod: "Credit Card",
      transactionId: "TXN456789123",
      description: "Family consultation session",
    },
  ];

  // Add sample meetups
  const sampleMeetups = [
    {
      profile1Id: 1,
      profile2Id: 2,
      requestDate: "2024-01-19",
      status: "scheduled",
      priority: "medium",
      proposedMeeting: {
        date: "2024-01-22",
        time: "2:00 PM",
        venue: "Cafe Coffee Day, CP Delhi",
        type: "Casual Meeting",
      },
      notes: "Second meeting request. First meeting went well.",
      adminNotes: "Confirmed with both families. Venue booked.",
    },
  ];

  try {
    // Create users and get their IDs
    const createdUsers = sampleUsers.map((userData) => {
      const existingUser = dataStore.getUserByEmail(userData.email);
      if (!existingUser) {
        return dataStore.createUser(userData);
      }
      return existingUser;
    });

    // Create profiles with correct user IDs
    sampleProfiles.forEach((profileData, index) => {
      if (createdUsers[index]) {
        const existingProfile = dataStore.getProfileByUserId(
          createdUsers[index].id
        );
        if (!existingProfile) {
          dataStore.createProfile({
            ...profileData,
            userId: createdUsers[index].id,
          });
        }
      }
    });

    // Create feedback
    sampleFeedback.forEach((feedbackData) => {
      const existingFeedback = dataStore
        .getFeedback()
        .find(
          (f) =>
            f.userId === feedbackData.userId &&
            f.subject === feedbackData.subject
        );
      if (!existingFeedback) {
        dataStore.feedback.push({
          id: Math.max(...dataStore.feedback.map((f) => f.id), 0) + 1,
          ...feedbackData,
          date: new Date().toISOString().split("T")[0],
          adminReply: null,
        });
      }
    });

    // Create payments
    samplePayments.forEach((paymentData) => {
      const existingPayment = dataStore
        .getPayments()
        .find((p) => p.transactionId === paymentData.transactionId);
      if (!existingPayment) {
        dataStore.createPayment(paymentData);
      }
    });

    // Create meetups
    sampleMeetups.forEach((meetupData) => {
      const existingMeetup = dataStore
        .getMeetups()
        .find(
          (m) =>
            m.profile1Id === meetupData.profile1Id &&
            m.profile2Id === meetupData.profile2Id
        );
      if (!existingMeetup) {
        dataStore.meetups.push({
          id: Math.max(...dataStore.meetups.map((m) => m.id), 0) + 1,
          ...meetupData,
        });
      }
    });

    // Save all data
    dataStore.saveData();

    console.log("Sample data generated successfully!");
    return { success: true, message: "Sample data generated successfully!" };
  } catch (error) {
    console.error("Error generating sample data:", error);
    return { success: false, message: error.message };
  }
};

// Function to reset all data (for testing)
export const resetAllData = () => {
  localStorage.removeItem("khatriLagnayaData");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("isAuthenticated");
  window.location.reload();
};
