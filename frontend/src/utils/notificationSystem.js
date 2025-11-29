// Notification System - Manages all notifications in the application
// Stores notifications in localStorage for persistence

class NotificationSystem {
  constructor() {
    this.notifications = this.loadNotifications();
  }

  loadNotifications() {
    const saved = localStorage.getItem("khatriLagnayaNotifications");
    return saved ? JSON.parse(saved) : [];
  }

  saveNotifications() {
    localStorage.setItem(
      "khatriLagnayaNotifications",
      JSON.stringify(this.notifications)
    );
  }

  createNotification(data) {
    const notification = {
      id: Math.max(...this.notifications.map((n) => n.id), 0) + 1,
      ...data,
      timestamp: new Date().toISOString(),
      read: false,
      createdAt: new Date().toISOString(),
    };

    this.notifications.unshift(notification);
    this.saveNotifications();
    return notification;
  }

  // User receives match suggestion
  notifyMatchSuggestion(userId, matchData) {
    return this.createNotification({
      type: "match_suggestion",
      userId,
      title: "New Match Suggestion!",
      message: `You have a new match with ${matchData.compatibility}% compatibility (${matchData.gunaScore} gunas matched)`,
      data: matchData,
      actionUrl: `/match/${matchData.matchId}`,
    });
  }

  // User expresses interest in a match
  notifyInterestExpressed(userId, targetUserId, profileName) {
    return this.createNotification({
      type: "interest_expressed",
      userId: targetUserId,
      title: "Someone is interested in your profile!",
      message: `${profileName} has expressed interest in your profile`,
      data: { fromUserId: userId },
      actionUrl: "/matches",
    });
  }

  // Admin notified about family meeting request
  notifyAdminMeetingRequest(meetupData) {
    return this.createNotification({
      type: "meeting_request",
      userId: "admin",
      title: "New Family Meeting Request",
      message: `${meetupData.family1Name} and ${meetupData.family2Name} want to arrange a meeting`,
      data: meetupData,
      actionUrl: "/admin",
      priority: "high",
    });
  }

  // User notified about meeting scheduled
  notifyMeetingScheduled(userId, meetupData) {
    return this.createNotification({
      type: "meeting_scheduled",
      userId,
      title: "Family Meeting Scheduled!",
      message: `Your meeting is scheduled for ${meetupData.date} at ${meetupData.time}`,
      data: meetupData,
      actionUrl: "/dashboard",
    });
  }

  // Profile verification status
  notifyProfileVerified(userId, status) {
    return this.createNotification({
      type: "profile_verification",
      userId,
      title:
        status === "verified"
          ? "Profile Verified!"
          : "Profile Verification Update",
      message:
        status === "verified"
          ? "Your profile has been verified and is now active"
          : "Your profile verification status has been updated",
      data: { status },
      actionUrl: "/profile",
    });
  }

  // Payment confirmation
  notifyPaymentReceived(userId, paymentData) {
    return this.createNotification({
      type: "payment_received",
      userId,
      title: "Payment Confirmed",
      message: `Your payment of ₹${paymentData.amount} has been received`,
      data: paymentData,
      actionUrl: "/dashboard",
    });
  }

  // Get notifications for a user
  getUserNotifications(userId, limit = 50) {
    return this.notifications
      .filter((n) => n.userId === userId || n.userId === "all")
      .slice(0, limit);
  }

  // Get unread count
  getUnreadCount(userId) {
    return this.notifications.filter(
      (n) => (n.userId === userId || n.userId === "all") && !n.read
    ).length;
  }

  // Mark as read
  markAsRead(notificationId) {
    const notification = this.notifications.find(
      (n) => n.id === notificationId
    );
    if (notification) {
      notification.read = true;
      this.saveNotifications();
    }
  }

  // Mark all as read for a user
  markAllAsRead(userId) {
    this.notifications.forEach((n) => {
      if (n.userId === userId || n.userId === "all") {
        n.read = true;
      }
    });
    this.saveNotifications();
  }

  // Delete notification
  deleteNotification(notificationId) {
    this.notifications = this.notifications.filter(
      (n) => n.id !== notificationId
    );
    this.saveNotifications();
  }

  // Clear all notifications for a user
  clearAllNotifications(userId) {
    this.notifications = this.notifications.filter((n) => n.userId !== userId);
    this.saveNotifications();
  }
}

// Create singleton instance
export const notificationSystem = new NotificationSystem();

export default notificationSystem;
