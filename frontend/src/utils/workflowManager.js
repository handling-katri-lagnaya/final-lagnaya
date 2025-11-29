// Workflow Manager - Handles complete user journey from login to marriage
import { dataStore } from "@/data/staticData";
import { notificationSystem } from "./notificationSystem";
import { calculateGunaMatching } from "./gunaMatching";

class WorkflowManager {
  // Step 1: User Registration and Profile Creation
  async registerUser(userData) {
    try {
      // Create user account
      const user = dataStore.createUser({
        ...userData,
        status: "pending",
        verified: false,
        profileComplete: 20,
      });

      // Log activity
      dataStore.addActivity({
        adminName: "System",
        action: "User Registration",
        target: user.email,
        type: "user_management",
        details: `New user registered: ${user.name}`,
      });

      return { success: true, user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Step 2: Profile Submission for Verification
  async submitProfileForVerification(userId, profileData) {
    try {
      const profile = dataStore.createProfile({
        ...profileData,
        userId,
        status: "pending",
        verificationStatus: "pending",
      });

      // Update user profile completion
      dataStore.updateUser(userId, { profileComplete: 80 });

      // Notify admin about new profile
      notificationSystem.createNotification({
        type: "profile_submitted",
        userId: "admin",
        title: "New Profile Submitted",
        message: `${profileData.personalDetails.firstName} ${profileData.personalDetails.lastName} submitted profile for verification`,
        data: { profileId: profile.id },
        actionUrl: "/admin",
        priority: "high",
      });

      // Log activity
      dataStore.addActivity({
        adminName: "System",
        action: "Profile Submitted",
        target: `${profileData.personalDetails.firstName} ${profileData.personalDetails.lastName}`,
        type: "profile_management",
        details: "Profile submitted for verification",
      });

      return { success: true, profile };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Step 3: Admin Verifies Profile
  async verifyProfile(adminName, profileId, status, notes) {
    try {
      const profile = dataStore.getProfileById(profileId);
      if (!profile) throw new Error("Profile not found");

      // Update profile status
      dataStore.updateProfile(profileId, {
        verificationStatus: status,
        status: status === "verified" ? "active" : "rejected",
        verifiedDate:
          status === "verified" ? new Date().toISOString().split("T")[0] : null,
        adminNotes: notes,
      });

      // Update user status
      if (status === "verified") {
        dataStore.updateUser(profile.userId, {
          status: "active",
          verified: true,
          profileComplete: 100,
        });
      }

      // Notify user
      notificationSystem.notifyProfileVerified(profile.userId, status);

      // Log activity
      dataStore.addActivity({
        adminName,
        action: `Profile ${status === "verified" ? "Verified" : "Rejected"}`,
        target: `${profile.personalDetails.firstName} ${profile.personalDetails.lastName}`,
        type: "verification",
        details: notes || `Profile ${status}`,
      });

      // If verified, generate initial matches
      if (status === "verified") {
        await this.generateInitialMatches(profile.id);
      }

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Step 4: Generate Initial Free Matches
  async generateInitialMatches(profileId) {
    try {
      const profile = dataStore.getProfileById(profileId);
      const allProfiles = dataStore
        .getProfiles()
        .filter(
          (p) =>
            p.id !== profileId &&
            p.verificationStatus === "verified" &&
            p.status === "active"
        );

      const matches = [];

      // Generate up to 2 free matches
      for (let i = 0; i < Math.min(2, allProfiles.length); i++) {
        const targetProfile = allProfiles[i];

        try {
          // Calculate real Guna matching
          const matchResult = calculateGunaMatching(profile, targetProfile);

          // Create match record
          const match = dataStore.createMatch({
            profile1Id: profileId,
            profile2Id: targetProfile.id,
            compatibility: matchResult.compatibilityPercentage,
            gunaScore: matchResult.gunaScore,
            matchedBy: "System",
            status: "suggested",
            matchDetails: {
              totalMatchedGunas: matchResult.totalMatchedGunas,
              compatibilityLevel: matchResult.compatibilityLevel,
              recommendation: matchResult.recommendation,
            },
          });

          matches.push(match);

          // Notify user about new match
          notificationSystem.notifyMatchSuggestion(profile.userId, {
            matchId: match.id,
            compatibility: matchResult.compatibilityPercentage,
            gunaScore: matchResult.gunaScore,
            profileName: `${targetProfile.personalDetails.firstName}`,
          });
        } catch (error) {
          console.error("Error generating match:", error);
        }
      }

      // Log activity
      dataStore.addActivity({
        adminName: "System",
        action: "Initial Matches Generated",
        target: `${profile.personalDetails.firstName} ${profile.personalDetails.lastName}`,
        type: "matching",
        details: `Generated ${matches.length} free matches`,
      });

      return { success: true, matches };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Step 5: User Expresses Interest
  async expressInterest(userId, matchId) {
    try {
      const user = dataStore.getUserById(userId);
      const match = dataStore.getMatches().find((m) => m.id === matchId);

      if (!match) throw new Error("Match not found");

      // Update match status
      const matches = dataStore.getMatches();
      const matchIndex = matches.findIndex((m) => m.id === matchId);
      if (matchIndex !== -1) {
        matches[matchIndex].status = "interested";
        matches[matchIndex].interestedBy = userId;
        matches[matchIndex].interestDate = new Date()
          .toISOString()
          .split("T")[0];
        dataStore.saveData();
      }

      // Get target profile
      const targetProfileId =
        match.profile1Id === userId ? match.profile2Id : match.profile1Id;
      const targetProfile = dataStore.getProfileById(targetProfileId);
      const targetUser = dataStore.getUserById(targetProfile.userId);

      // Notify the other user
      notificationSystem.notifyInterestExpressed(
        userId,
        targetUser.id,
        user.name
      );

      // Notify admin
      notificationSystem.createNotification({
        type: "interest_expressed",
        userId: "admin",
        title: "Interest Expressed",
        message: `${user.name} expressed interest in ${targetUser.name}`,
        data: { matchId, userId, targetUserId: targetUser.id },
        actionUrl: "/admin",
      });

      // Log activity
      dataStore.addActivity({
        adminName: user.name,
        action: "Interest Expressed",
        target: `Match ID: ${matchId}`,
        type: "matching",
        details: `User expressed interest in a match`,
      });

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Step 6: Request Family Meeting
  async requestFamilyMeeting(userId, matchId, meetingDetails) {
    try {
      const user = dataStore.getUserById(userId);
      const match = dataStore.getMatches().find((m) => m.id === matchId);

      if (!match) throw new Error("Match not found");

      const profile1 = dataStore.getProfileById(match.profile1Id);
      const profile2 = dataStore.getProfileById(match.profile2Id);

      // Create meetup request
      const meetup = {
        id: Math.max(...dataStore.getMeetups().map((m) => m.id), 0) + 1,
        profile1Id: match.profile1Id,
        profile2Id: match.profile2Id,
        matchId: matchId,
        requestDate: new Date().toISOString().split("T")[0],
        status: "pending",
        priority: "high",
        proposedMeeting: meetingDetails,
        requestedBy: userId,
        notes: meetingDetails.notes || "",
        adminNotes: "",
      };

      dataStore.meetups.push(meetup);
      dataStore.saveData();

      // Notify admin about meeting request
      notificationSystem.notifyAdminMeetingRequest({
        meetupId: meetup.id,
        family1Name: `${profile1.personalDetails.firstName} ${profile1.personalDetails.lastName}`,
        family2Name: `${profile2.personalDetails.firstName} ${profile2.personalDetails.lastName}`,
        date: meetingDetails.date,
        venue: meetingDetails.venue,
      });

      // Log activity
      dataStore.addActivity({
        adminName: user.name,
        action: "Meeting Request Submitted",
        target: `${profile1.personalDetails.firstName} & ${profile2.personalDetails.firstName}`,
        type: "meetup",
        details: `Family meeting requested for ${meetingDetails.date}`,
      });

      return { success: true, meetup };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Step 7: Admin Schedules Meeting
  async scheduleMeeting(adminName, meetupId, meetingDetails, notes) {
    try {
      const meetup = dataStore.getMeetups().find((m) => m.id === meetupId);
      if (!meetup) throw new Error("Meetup not found");

      // Update meetup status
      dataStore.updateMeetup(meetupId, {
        status: "scheduled",
        proposedMeeting: meetingDetails,
        adminNotes: notes,
        scheduledDate: new Date().toISOString().split("T")[0],
      });

      const profile1 = dataStore.getProfileById(meetup.profile1Id);
      const profile2 = dataStore.getProfileById(meetup.profile2Id);

      // Notify both families
      notificationSystem.notifyMeetingScheduled(profile1.userId, {
        meetupId,
        date: meetingDetails.date,
        time: meetingDetails.time,
        venue: meetingDetails.venue,
      });

      notificationSystem.notifyMeetingScheduled(profile2.userId, {
        meetupId,
        date: meetingDetails.date,
        time: meetingDetails.time,
        venue: meetingDetails.venue,
      });

      // Log activity
      dataStore.addActivity({
        adminName,
        action: "Meeting Scheduled",
        target: `${profile1.personalDetails.firstName} & ${profile2.personalDetails.firstName}`,
        type: "meetup",
        details: `Meeting scheduled for ${meetingDetails.date} at ${meetingDetails.venue}`,
      });

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Step 8: Meeting Completed - Request Payment
  async completeMeeting(adminName, meetupId, outcome) {
    try {
      const meetup = dataStore.getMeetups().find((m) => m.id === meetupId);
      if (!meetup) throw new Error("Meetup not found");

      // Update meetup status
      dataStore.updateMeetup(meetupId, {
        status: "completed",
        outcome,
        completedDate: new Date().toISOString().split("T")[0],
      });

      const profile1 = dataStore.getProfileById(meetup.profile1Id);
      const profile2 = dataStore.getProfileById(meetup.profile2Id);

      // If outcome is positive, notify about success fee
      if (outcome === "marriage_agreed") {
        notificationSystem.createNotification({
          type: "payment_request",
          userId: profile1.userId,
          title: "Congratulations! 🎉",
          message: "Marriage agreed! Success fee payment is now due.",
          data: { meetupId, amount: 15000 },
          actionUrl: "/payment",
        });

        notificationSystem.createNotification({
          type: "payment_request",
          userId: profile2.userId,
          title: "Congratulations! 🎉",
          message: "Marriage agreed! Success fee payment is now due.",
          data: { meetupId, amount: 15000 },
          actionUrl: "/payment",
        });
      }

      // Log activity
      dataStore.addActivity({
        adminName,
        action: "Meeting Completed",
        target: `${profile1.personalDetails.firstName} & ${profile2.personalDetails.firstName}`,
        type: "meetup",
        details: `Meeting completed with outcome: ${outcome}`,
      });

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Step 9: Process Payment
  async processPayment(userId, paymentData) {
    try {
      const payment = dataStore.createPayment({
        userId,
        ...paymentData,
        status: "completed",
        date: new Date().toISOString().split("T")[0],
      });

      // Notify user
      notificationSystem.notifyPaymentReceived(userId, paymentData);

      // Notify admin
      notificationSystem.createNotification({
        type: "payment_received",
        userId: "admin",
        title: "Payment Received",
        message: `Payment of ₹${paymentData.amount} received from user`,
        data: payment,
        actionUrl: "/admin",
      });

      // Log activity
      dataStore.addActivity({
        adminName: "System",
        action: "Payment Received",
        target: `User ID: ${userId}`,
        type: "payment",
        details: `Payment of ₹${paymentData.amount} processed successfully`,
      });

      return { success: true, payment };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Get user journey status
  getUserJourneyStatus(userId) {
    const user = dataStore.getUserById(userId);
    const profile = dataStore.getProfileByUserId(userId);
    const matches = dataStore
      .getMatches()
      .filter(
        (m) => m.profile1Id === profile?.id || m.profile2Id === profile?.id
      );
    const meetups = dataStore
      .getMeetups()
      .filter(
        (m) => m.profile1Id === profile?.id || m.profile2Id === profile?.id
      );
    const payments = dataStore.getPayments().filter((p) => p.userId === userId);

    return {
      registered: !!user,
      profileCreated: !!profile,
      profileVerified: profile?.verificationStatus === "verified",
      matchesReceived: matches.length,
      interestExpressed: matches.filter((m) => m.status === "interested")
        .length,
      meetingsRequested: meetups.filter((m) => m.status === "pending").length,
      meetingsScheduled: meetups.filter((m) => m.status === "scheduled").length,
      meetingsCompleted: meetups.filter((m) => m.status === "completed").length,
      paymentsCompleted: payments.filter((p) => p.status === "completed")
        .length,
      currentStage: this.determineCurrentStage(user, profile, matches, meetups),
    };
  }

  determineCurrentStage(user, profile, matches, meetups) {
    if (!user) return "not_registered";
    if (!profile) return "profile_pending";
    if (profile.verificationStatus === "pending") return "verification_pending";
    if (profile.verificationStatus === "rejected") return "profile_rejected";
    if (matches.length === 0) return "awaiting_matches";
    if (matches.some((m) => m.status === "interested"))
      return "interest_expressed";
    if (meetups.some((m) => m.status === "pending")) return "meeting_requested";
    if (meetups.some((m) => m.status === "scheduled"))
      return "meeting_scheduled";
    if (meetups.some((m) => m.status === "completed"))
      return "meeting_completed";
    return "browsing_matches";
  }
}

export const workflowManager = new WorkflowManager();
export default workflowManager;
