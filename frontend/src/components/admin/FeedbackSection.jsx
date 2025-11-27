import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageSquare,
  Star,
  ThumbsUp,
  ThumbsDown,
  User,
  Calendar,
  Filter,
  Reply,
  Archive,
  Flag,
} from "lucide-react";

const FeedbackSection = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Mock feedback data
  const feedbacks = [
    {
      id: 1,
      userName: "Priya Sharma",
      userEmail: "priya.sharma@email.com",
      type: "positive",
      rating: 5,
      category: "Service Quality",
      subject: "Excellent matchmaking service!",
      message:
        "I am extremely happy with the service provided by Khatri Lagnaya. The team was very professional and found me a perfect match. The guna matching was accurate and the family coordination was seamless. Highly recommended!",
      date: "2024-01-20",
      status: "new",
      adminReply: null,
      tags: ["service", "matching", "professional"],
    },
    {
      id: 2,
      userName: "Rahul Gupta",
      userEmail: "rahul.gupta@email.com",
      type: "suggestion",
      rating: 4,
      category: "Feature Request",
      subject: "Mobile app would be great",
      message:
        "The service is good but it would be much better if you had a mobile app. The website works fine on mobile but a dedicated app would provide better user experience.",
      date: "2024-01-19",
      status: "in_progress",
      adminReply:
        "Thank you for the suggestion. We are currently working on a mobile app and it will be launched soon.",
      tags: ["mobile", "app", "suggestion"],
    },
    {
      id: 3,
      userName: "Anjali Agarwal",
      userEmail: "anjali.agarwal@email.com",
      type: "complaint",
      rating: 2,
      category: "Communication",
      subject: "Delayed response from team",
      message:
        "I submitted my profile 2 weeks ago but haven't received any match suggestions yet. The customer support is also slow to respond. Please improve the response time.",
      date: "2024-01-18",
      status: "resolved",
      adminReply:
        "We apologize for the delay. Your profile has been prioritized and you will receive match suggestions within 24 hours. We are also improving our response time.",
      tags: ["delay", "support", "communication"],
    },
    {
      id: 4,
      userName: "Vikram Singh",
      userEmail: "vikram.singh@email.com",
      type: "positive",
      rating: 5,
      category: "Match Quality",
      subject: "Found my life partner!",
      message:
        "Thanks to Khatri Lagnaya, I found my perfect life partner. The compatibility matching was spot on and the family meeting was arranged perfectly. We are getting married next month!",
      date: "2024-01-17",
      status: "resolved",
      adminReply:
        "Congratulations! We are so happy to hear about your success. Wishing you both a wonderful married life ahead!",
      tags: ["success", "marriage", "compatibility"],
    },
    {
      id: 5,
      userName: "Meera Patel",
      userEmail: "meera.patel@email.com",
      type: "neutral",
      rating: 3,
      category: "Pricing",
      subject: "Pricing clarification needed",
      message:
        "The pricing structure is a bit confusing. It would be helpful if you could provide more clarity on what's included in each package and when payments are due.",
      date: "2024-01-16",
      status: "new",
      adminReply: null,
      tags: ["pricing", "clarity", "packages"],
    },
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case "positive":
        return <ThumbsUp className="h-4 w-4 text-green-600" />;
      case "complaint":
        return <ThumbsDown className="h-4 w-4 text-red-600" />;
      case "suggestion":
        return <MessageSquare className="h-4 w-4 text-blue-600" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeBadge = (type) => {
    const typeConfig = {
      positive: { color: "bg-green-100 text-green-800 border-green-200" },
      complaint: { color: "bg-red-100 text-red-800 border-red-200" },
      suggestion: { color: "bg-blue-100 text-blue-800 border-blue-200" },
      neutral: { color: "bg-gray-100 text-gray-800 border-gray-200" },
    };

    return (
      <Badge className={typeConfig[type].color}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      in_progress: { color: "bg-blue-100 text-blue-800 border-blue-200" },
      resolved: { color: "bg-green-100 text-green-800 border-green-200" },
    };

    return (
      <Badge className={statusConfig[status].color}>
        {status.replace("_", " ").charAt(0).toUpperCase() +
          status.replace("_", " ").slice(1)}
      </Badge>
    );
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm text-muted-foreground ml-1">({rating}/5)</span>
      </div>
    );
  };

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    if (filterType === "all") return true;
    return feedback.type === filterType;
  });

  const handleReply = (feedbackId, reply) => {
    console.log(`Replying to feedback ${feedbackId}: ${reply}`);
    alert("Reply sent successfully!");
    setReplyText("");
  };

  const handleStatusUpdate = (feedbackId, newStatus) => {
    console.log(`Updating feedback ${feedbackId} status to ${newStatus}`);
    alert(`Feedback status updated to ${newStatus}!`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Customer Feedback
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage customer feedback, reviews, and suggestions
          </p>
        </CardHeader>
      </Card>

      {/* Feedback Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {feedbacks.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Feedback</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {feedbacks.filter((f) => f.type === "positive").length}
            </div>
            <div className="text-sm text-muted-foreground">Positive</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {feedbacks.filter((f) => f.type === "complaint").length}
            </div>
            <div className="text-sm text-muted-foreground">Complaints</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {feedbacks.filter((f) => f.type === "suggestion").length}
            </div>
            <div className="text-sm text-muted-foreground">Suggestions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {feedbacks.filter((f) => f.status === "new").length}
            </div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feedback List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Feedback List</h3>
            <div className="flex gap-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("all")}
              >
                All
              </Button>
              <Button
                variant={filterType === "positive" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("positive")}
              >
                Positive
              </Button>
              <Button
                variant={filterType === "complaint" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("complaint")}
              >
                Complaints
              </Button>
              <Button
                variant={filterType === "suggestion" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("suggestion")}
              >
                Suggestions
              </Button>
            </div>
          </div>

          {filteredFeedbacks.map((feedback) => (
            <Card
              key={feedback.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedFeedback?.id === feedback.id
                  ? "border-primary shadow-md"
                  : ""
              }`}
              onClick={() => setSelectedFeedback(feedback)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(feedback.type)}
                    <span className="font-medium">{feedback.userName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(feedback.status)}
                    <span className="text-sm text-muted-foreground">
                      {new Date(feedback.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{feedback.subject}</h4>
                    {renderStars(feedback.rating)}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {feedback.message}
                  </p>

                  <div className="flex items-center gap-2">
                    {getTypeBadge(feedback.type)}
                    <Badge variant="outline" className="text-xs">
                      {feedback.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feedback Details */}
        <div className="space-y-4">
          {selectedFeedback ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Feedback Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* User Info */}
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-medium">
                        {selectedFeedback.userName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {selectedFeedback.userEmail}
                      </div>
                    </div>
                    <div className="text-right">
                      {renderStars(selectedFeedback.rating)}
                      <div className="text-sm text-muted-foreground">
                        {new Date(selectedFeedback.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Feedback Content */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">
                        {selectedFeedback.subject}
                      </h4>
                      {getTypeBadge(selectedFeedback.type)}
                    </div>
                    <p className="text-sm leading-relaxed p-3 bg-muted/30 rounded-lg">
                      {selectedFeedback.message}
                    </p>
                  </div>

                  {/* Tags */}
                  <div>
                    <h5 className="font-medium mb-2">Tags</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedFeedback.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Admin Reply */}
                  {selectedFeedback.adminReply && (
                    <div>
                      <h5 className="font-medium mb-2">Admin Reply</h5>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm">{selectedFeedback.adminReply}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Reply className="h-5 w-5" />
                    Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Reply */}
                  {!selectedFeedback.adminReply && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Reply to Customer
                      </label>
                      <Textarea
                        placeholder="Type your reply here..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={3}
                      />
                      <Button
                        className="mt-2 w-full"
                        onClick={() =>
                          handleReply(selectedFeedback.id, replyText)
                        }
                        disabled={!replyText.trim()}
                      >
                        <Reply className="h-4 w-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  )}

                  {/* Status Actions */}
                  <div className="flex gap-2">
                    {selectedFeedback.status === "new" && (
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() =>
                          handleStatusUpdate(selectedFeedback.id, "in_progress")
                        }
                      >
                        Mark In Progress
                      </Button>
                    )}
                    {selectedFeedback.status !== "resolved" && (
                      <Button
                        className="flex-1"
                        onClick={() =>
                          handleStatusUpdate(selectedFeedback.id, "resolved")
                        }
                      >
                        Mark Resolved
                      </Button>
                    )}
                  </div>

                  {/* Additional Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Archive className="h-3 w-3 mr-2" />
                      Archive
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Flag className="h-3 w-3 mr-2" />
                      Flag
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select Feedback</h3>
                <p className="text-muted-foreground">
                  Click on a feedback item to view details and respond
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;
